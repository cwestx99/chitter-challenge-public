import { useState } from "react";
import axios from "axios";

const Peeps = ({ id, author, peepText, peepDate, authorName, user, replies, loggedIn }) => {


    const [reply, setReply] = useState({
        peepID: id,
        author: user,
        message: "",
    })

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setReply({
            ...reply,
            [name]: value
        });
    }

    const createReply = async (e) => {
        e.preventDefault();
        const res = await axios.put("http://localhost:4000/replyPeep", reply);
        document.getElementById("message").value = "";
        window.location.reload(false);
    }

    return (
        <>
            <div className="ms-5 rounded" id={id}>
                <div className="border rounded m-2 p-1 shadow  bg-light">
                    <div className="d-flex border-bottom border-2 p-1">
                        <div className="rounded-circle text-white bg-danger h-50 p-2 me-3">{author.firstName.charAt(0)}{author.lastName.charAt(0)}</div>
                        <div>
                            <p className="m-0 fw-bold">{author.firstName} {author.lastName}</p>
                            <p className="m-0 fw-light">@{author.userName}</p>
                        </div>
                    </div>
                    <div className="pt-1 ps-1 text-black">
                        <p >{peepText}</p>

                        <p className="text-end pe-1 pb-1 text-secondary">
                            {new Date(peepDate).toLocaleDateString("en-GB", {
                                year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
                            })}
                        </p>
                    </div>
                </div>
            </div>


            {(replies) &&
                <div className="w-50 ms-5 rounded">
                    {replies.slice(0).reverse().map(reply => (
                        <div className="border rounded m-2 p-1 shadow  bg-light">
                            <div className="d-flex border-bottom border-2 p-1">
                                <div className="rounded-circle text-white bg-danger h-50 p-2 me-3">{reply.author.firstName.charAt(0)}{reply.author.lastName.charAt(0)}</div>
                                <div>
                                    <p className="m-0 fw-bold">{reply.author.firstName} {reply.author.lastName}</p>
                                    <p className="m-0 fw-light">@{reply.author.userName}</p>
                                </div>
                            </div>
                            <div className="pt-1 ps-1 text-black">
                                <p >{reply.message}</p>

                                <p className="text-end pe-1 pb-1 text-secondary">
                                    {new Date(reply.timeStamp).toLocaleDateString("en-GB", {
                                        year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
                                    })}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            }

            {loggedIn &&
                <div className="ms-5 w-75">

                    <div className="rounded m-2 p-1 shadow  bg-white mb-5">
                        <div className="d-flex border-bottom border-2 p-2">
                            <div className="rounded-circle text-white bg-danger h-50 p-2 me-3">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
                            <div>
                                <p className="m-0 fw-bold">{user.firstName} {user.lastName}</p>
                                <p className="m-0 fw-light">@{user.userName}</p>
                            </div>
                        </div>

                        <form onSubmit={createReply}>
                            <textarea
                                name="message"
                                id="message"
                                placeholder="Reply..."
                                onChange={handleChange}
                                className="w-100 border-0 rounded mt-1"
                                required />
                            <div className="btn-toolbar py-2 d-flex justify-content-end">
                                <div className="btn-group">
                                    <button type="submit" className="btn btn-primary">Reply</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            }

        </>
    );
}

export default Peeps;