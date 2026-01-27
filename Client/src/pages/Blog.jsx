import BlogPage from "../components/BlogPage";
import BlogSection from "../components/BlogSection"

const About = () => {
    return (
        <>
            <BlogPage />
            <BlogSection showHeader={false} />
        </>
    );
};

export default About;