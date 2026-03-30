
const Notification = ({message, success}) => {
    if (!message) {
        return null;
    }
    // if message is an error or message is a success
    return (
        <div className={success ? "Success" : "Error"}>
            {message}
            {console.log(`success in notification: ${success}`)}
        </div>
    )
}

export default Notification