export default function CVForm() {
    const API = "http://localhost:3001/upload";
    return (
    <form action={API} method="post" encType="multipart/form-data">
        <input type="file" name="file" />
        <input type="submit"></input>
    </form>
    )
}
  