import AppLayout from "../../components/AppLayout/AppLayout";
import PreprocessingCard from "../../components/PreprocessingCard/PreprocessingCard";
import App from "../App/App";
import { useStyles } from "./styles";

const PreprocessingPage = () => {
    const classes = useStyles();

    return (
        <>
        <AppLayout pageNumber={1}>
            <PreprcessingCard/>
        </AppLayout>
        </>
    );
};

export default PreprocessingPage;