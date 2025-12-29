"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import { Grid2, Stack } from "@mui/material";
import MenuAppBar from "../menuAppBar";
import DataCard from "./dataCard";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PaidRoundedIcon from "@mui/icons-material/PaidRounded";
import PublicRoundedIcon from "@mui/icons-material/PublicRounded";
import PeopleAltRoundedIcon from "@mui/icons-material/PeopleAltRounded";
import readCompanyCsv, { CompanyData } from "@/app/api/companyCsvReader";
import { Doughnut, Line } from "react-chartjs-2";
import {
  Chart,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";

export default function DashboardPage() {
  const [companyData, setCompanyData] = React.useState<CompanyData>();
  const [loading, setLoading] = React.useState(true);

  let companyCount = NaN;
  let totalEmployee = NaN;
  let totalRevenue = NaN;
  let countryCount = NaN;
  let level = [0, 0, 0, 0];
  let yearList = new Array<string>();
  let companyByYear = new Array<number>();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await readCompanyCsv();
        setCompanyData(data);
      } catch (error) {
        console.error("Error loading CSV data:", error);
        setCompanyData(undefined);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);
  if (loading) {
    return <div className="text-center p-4">Loading user...</div>;
  }
  if (companyData !== undefined) {
    companyCount = companyData.companyCount;
    totalEmployee = companyData.totalEmployee;
    totalRevenue = companyData.totalRevenue;
    countryCount = companyData.countryCount;
    level = companyData.level;
    yearList = companyData.year.yearList;
    companyByYear = companyData.year.companyCount;
  }

  Chart.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title
  );

  const doughnutData = {
    datasets: [
      {
        label: "# of Company",
        data: level,
        backgroundColor: [
          "rgba(99, 255, 146, 1)",
          "rgba(54, 163, 235, 1)",
          "rgba(255, 207, 86, 1)",
          "rgba(255, 86, 86, 1)",
        ],
      },
    ],

    labels: ["Level 1", "Level 2", "Level 3", "Level 4"],
  };

  const lineData = {
    labels: yearList,

    datasets: [
      {
        label: "Company number per year",
        data: companyByYear,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  return (
    <>
      <MenuAppBar>
        <Grid2 container spacing={2} width="80%">
          <Grid2 size={6}>
            <Stack padding={2} spacing={3}>
              <DataCard
                cardTitle="Company Number"
                cardData={companyCount}
                icon={
                  <ApartmentRoundedIcon color="info" sx={{ fontSize: 90 }} />
                }
              />
              <DataCard
                cardTitle="Revenue"
                cardData={totalRevenue}
                icon={<PaidRoundedIcon color="info" sx={{ fontSize: 90 }} />}
              />
              <DataCard
                cardTitle="Country"
                cardData={countryCount}
                icon={<PublicRoundedIcon color="info" sx={{ fontSize: 90 }} />}
              />
              <DataCard
                cardTitle="Employee"
                cardData={totalEmployee}
                icon={
                  <PeopleAltRoundedIcon color="info" sx={{ fontSize: 90 }} />
                }
              />
            </Stack>
          </Grid2>
          <Grid2 size={6}>
            <Stack
              padding={2}
              spacing={3}
              height={500}
              sx={{
                alignItems: "center",
              }}
            >
              <Line data={lineData} />
              <Doughnut data={doughnutData} />
            </Stack>
          </Grid2>
        </Grid2>
      </MenuAppBar>
    </>
  );
}
