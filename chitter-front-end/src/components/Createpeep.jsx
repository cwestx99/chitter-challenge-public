import { useState } from "react";
import axios from "axios";

const Createpeep = ({ user }) => {

    const [peep, setPeep] = useState({
        author: user,
        message: "",
    })

    const handleChange = e => {
        e.preventDefault();
        const { name, value } = e.target;
        setPeep({
            ...peep,
            [name]: value
        });
    }

    const createPeep = async (e) => {
        e.preventDefault();
        const res = await axios.post("http://localhost:4000/postPeep", peep);
        console.log(res);
        document.getElementById("message").value = "";
        window.location.reload(false);
    }

    return (

        <div className="ms-5">
            <div className="m-2 p-1 border-bottom  mb-5">
                <div className="d-flex p-2">
                    <div className="rounded-circle text-white bg-danger h-50 p-2 me-3">{user.firstName.charAt(0)}{user.lastName.charAt(0)}</div>
                    <div>
                        <p className="m-0 fw-bold">{user.firstName} {user.lastName}</p>
                        <p className="m-0 fw-light">@{user.userName}</p>
                    </div>
                </div>

                <form onSubmit={createPeep}>
                    <textarea
                        name="message"
                        id="message"
                        placeholder="Peep something..."
                        onChange={handleChange}
                        rows="3"
                        className="w-100 border-0 rounded mt-1"
                        required />
                    <div className="btn-toolbar py-2 d-flex justify-content-end">
                        <div className="btn-group">
                            <button type="submit" className="btn btn-primary">Peep</button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        // <div className="text-black border-bottom border-2 m-4">
        //     <div >
        //         <p className=" text-capitalize fs-1 fw-bold">{user.firstName} {user.lastName} <span p className="text-size-sm fs-5 fw-light">@{user.userName}</span> </p>

        //         <div className="bg-light text-secondary">


        //             <form className="form-group mb-3" onSubmit={createPeep}>
        //                 <textarea className="form-control mb-2"
        //                     name="message"
        //                     id="message"
        //                     placeholder="Peep something..."
        //                     onChange={handleChange}
        //                     rows="3"
        //                     required />
        //                 <div className="btn-toolbar py-2">
        //                     <div className="btn-group">
        //                         <button type="submit" className="btn btn-secondary">Peep</button>
        //                     </div>
        //                 </div>
        //             </form>
        //         </div>
        //     </div>
        // </div>




    );
}
export default Createpeep;