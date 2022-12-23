import Carrousel from "./(components)/carrousel/carrousel"

const Main = () => 
    <main>
        {
        /* @ts-expect-error Server Component */
        <Carrousel/>
        }
    </main>

export default Main