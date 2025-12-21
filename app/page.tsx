import SignIn from "./sign-in/page.tsx";
import UserTable from "./home/user-table/userTable.tsx";
import { UserTablePage } from "./home/user-table/page.tsx";
import { CompanyTablePage } from "./home/company-table/page.tsx";

export default function Home() {
  return <CompanyTablePage />;
}
