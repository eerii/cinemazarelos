const Post = ({ params } : { params: {id: string} }) => <main>
    <h1>{params.id}</h1>
</main>

export default Post