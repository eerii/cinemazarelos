import Head from 'next/head'
import styled from 'styled-components'

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: palevioletred;
`;

const Home = () => {
  return (
    <div>
      <Head>
        <title>cinemazarelos</title>
        <meta name="description" content="A web do ciclo de cine da facultade de Filosofía USC" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Title>cinemazarelos</Title>

        <p>...</p>
      </main>

      <footer>
        
      </footer>
    </div>
  )
}

export default Home