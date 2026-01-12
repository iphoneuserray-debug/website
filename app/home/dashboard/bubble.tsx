import CompanyData from "@/app/api/CompanyData";
import { RowData } from "@/app/api/rowData";
import { TreeNode } from "@/app/api/tree";
import * as d3 from "d3";
import { useState, useRef, useEffect } from "react";

export default function Bubble({
    data,
    companyData,
    changeHandler,
}: {
    data: TreeNode;
    companyData: CompanyData;
    changeHandler: (row: RowData | undefined) => void;
}) {
    const width = 800;
    const height = width;
    const color = d3
        .scaleLinear<string>()
        .domain([0, companyData.level.length - 1])
        .range(["hsla(193, 80%, 80%, 0.81)", "hsla(212, 66%, 43%, 0.87)"])
        .interpolate(d3.interpolateHcl);

    const svgRef = useRef<SVGSVGElement>(null);

    useEffect(() => {
        if (!svgRef.current) return;

        const svg = d3
            .select(svgRef.current)
            .attr("viewBox", `-${width / 2} -${height / 2} ${width} ${height}`)
            .attr("width", "100%")
            .attr("height", "auto")
            .attr(
                "style",
                `max-width: 100%; height: auto; display: block; margin: 0 -14px; background: ${color(
                    0
                )}; cursor: pointer;`
            );

        svg.selectAll("*").remove();

        const hierarchy = d3
            .hierarchy(data)
            .sort(
                (
                    a: d3.HierarchyNode<TreeNode>,
                    b: d3.HierarchyNode<TreeNode>
                ) => {
                    const aValue = companyData.rows.find(
                        (value) => a.data.id === value.company_code
                    )?.annual_revenue;
                    const bValue = companyData.rows.find(
                        (value) => b.data.id === value.company_code
                    )?.annual_revenue;
                    return (bValue || 0) - (aValue || 0);
                }
            )
            .sum((d: TreeNode) => {
                const company = companyData.rows.find(
                    (value) => d.id === value.company_code
                );
                return company?.annual_revenue || 1;
            });
        const pack = d3.pack<TreeNode>().size([width, height]).padding(3);
        const root = pack(hierarchy);

        const node = svg
            .append("g")
            .selectAll("circle")
            .data(root.descendants())
            .join("circle")
            .attr("fill", (d) => (d.children ? color(d.depth) : "white"))
            .on("mouseover", function (event: MouseEvent, d) {
                d3.select(this).attr("stroke", "#000");

                // Set tooltip text
                const company = companyData.rows.find(
                    (value) => d.data.id === value.company_code
                );
                if (!company) return;
                const text = `Lev: ${company?.level} ${company?.company_name} ${
                    company?.founded_year
                } ${company?.country} Rev: ${company!.annual_revenue} Emp: ${
                    company!.employees
                }`;
                tooltipText.text(text);
                changeHandler(company);

                // Set tooltip text position
                const textWidth = tooltipText.node()!.getBBox().width;
                const textHeight = tooltipText.node()!.getBBox().height;
                const [x, y] = d3.pointer(event, svg.node());
                let _x: number = x;
                if (x + textWidth > width / 2) _x = width / 2 - textWidth - 5;

                // Set background position
                tooltipText.attr(
                    "transform",
                    `translate(0, ${textHeight - textHeight / 4})`
                );
                tooltipRec.attr("width", textWidth).attr("height", textHeight);
                // Set tooltip animation
                tooltip
                    .transition()
                    .duration(200)
                    .style("opacity", 1)
                    .attr("transform", `translate(${_x}, ${y})`);
            })
            .on("mouseout", function (event: MouseEvent, d) {
                d3.select(this).attr("stroke", null);

                tooltip.transition().duration(200).style("opacity", 0);
                changeHandler(undefined);
            })
            .on("click", (event, d) => {
                if (d.children) {
                    focus !== d && (zoom(event, d), event.stopPropagation());
                }
            })
            .attr("r", (d) => d.r);

        const label = svg
            .append("g")
            .style("font", "10px sans-serif")
            .attr("pointer-events", "none")
            .attr("text-anchor", "middle")
            .selectAll("text")
            .data(root.descendants())
            .join("text")
            .style("fill-opacity", (d) => (d.parent === root ? 1 : 0))
            .style("display", (d) => (d.parent === root ? "inline" : "none"))
            .text((d) => {
                const company = companyData.rows.find(
                    (value) => d.data.id === value.company_code
                );
                if (!company) return "";

                const companyName = company.company_name;
                const maxChars = Math.floor(d.r / 3);

                if (companyName.length > maxChars)
                    return companyName.substring(0, maxChars);
                return companyName;
            })
            .attr("clip-path", (d) => `circle(${d.r})`);

        const tooltip = svg
            .append("g")
            .style("opacity", 0)
            .style("pointer-events", "none");

        const tooltipRec = tooltip.append("rect").attr("fill", "white");

        const tooltipText = tooltip
            .append("text")
            .style("fill", "#333")
            .style("font", "10px sans-serif");

        svg.on("click", (event) => zoom(event, root));
        let focus = root;
        let view: d3.ZoomView;
        zoomTo([focus.x, focus.y, focus.r * 2]);

        function zoomTo(v: d3.ZoomView) {
            const k = width / v[2];

            view = v;

            label.attr(
                "transform",
                (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
            );
            node.attr(
                "transform",
                (d) => `translate(${(d.x - v[0]) * k},${(d.y - v[1]) * k})`
            );
            node.attr("r", (d) => d.r * k);
        }

        function zoom(
            event: MouseEvent,
            d: d3.HierarchyCircularNode<TreeNode>
        ) {
            const focus0 = focus;

            focus = d;

            const transition = svg
                .transition()
                .duration(event.altKey ? 7500 : 750)
                .tween("zoom", (d) => {
                    const i = d3.interpolateZoom(view, [
                        focus.x,
                        focus.y,
                        focus.r * 2,
                    ]);
                    return (t) => zoomTo(i(t));
                });

            label
                .filter(function (this: any, d) {
                    return (
                        d.parent === focus || this.style.display === "inline"
                    );
                })
                .transition()
                .style("fill-opacity", (d) => (d.parent === focus ? 1 : 0))
                .on("start", function (this: any, d) {
                    if (d.parent === focus) this.style.display = "inline";
                })
                .on("end", function (this: any, d) {
                    if (d.parent !== focus) this.style.display = "none";
                });
        }
    }, [data]);

    return <svg ref={svgRef} width="100%" height="100%"></svg>;
}
