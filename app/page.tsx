import { PlaceholderMovie } from "../styles/main_styles"

const Home = () => {
    return (
        <div>
            <main style={{ margin: "2%" }}>
                <div style={{ display: "flex", flexBasis: "1", flexWrap: "wrap", overflowY: "hidden" }}>
                    <PlaceholderMovie style={{ width: "200px", height: "300px", margin: "16px" }}/>
                    <div style={{ textAlign: "justify",height: "300px", margin: "0 16px", flex: "1 1" }}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                        <p>Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.</p>
                    </div>
                    <PlaceholderMovie style={{ width: "200px", height: "300px", margin: "16px" }}/>
                    <PlaceholderMovie style={{ width: "200px", height: "300px", margin: "16px" }}/>
                </div>
                <PlaceholderMovie style={{ width: "50%", height: "400px", margin: "16px" }}/>
            </main>
            
            <footer>
                <div style={{ margin: "2%", paddingBottom: "8px" }}>
                    <p>Creado con amor polo equipo cinemazarelos da facultade de Filosofía USC</p>
                </div>
            </footer>
        </div>
        )
    }

export default Home