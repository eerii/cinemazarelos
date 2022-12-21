import Carrousel from "./(components)/carrousel/carrousel"

export default () => {
    return (
        <main>
            {/* @ts-expect-error Server Component */}
            <Carrousel/>
        </main>
    )
}