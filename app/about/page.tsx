import Content, {frontmatter} from "./content.mdx"
import style from "./about.module.css"

const About = () => {
    return (<main className={style.main}>
        <Content/>
    </main>)
}

export default About