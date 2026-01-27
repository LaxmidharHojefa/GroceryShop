import BlogSection from "../components/BlogSection";
import AboutPage from "../components/AboutPage";
import Achievement from "../components/Achievement";

const About = () => {
    return (
        <>
            <AboutPage />
            <Achievement />
            <BlogSection limit={3} />
        </>
    );
};

export default About;