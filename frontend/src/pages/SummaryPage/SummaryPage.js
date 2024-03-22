import AppLayout from "../../components/AppLayout/AppLayout";
//import SelectCard from "../../components/SelectCard/SelectCard";

import { useStyles } from "./styles";

const SummaryPage = () => {
  const classes = useStyles();

  return (
    <>
      <AppLayout pageNumber={3}>
        Summary
      </AppLayout>
    </>
  );
};

export default SummaryPage;