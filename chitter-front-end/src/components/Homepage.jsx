import { useState, useEffect } from "react";
import axios from "axios";
import Createpeep from "./Createpeep";
import Peeps from "./Peeps";

const Homepage = ({ user, loggedIn }) => {

    const [peeps, setPeeps] = useState([]);

    const getPeeps = useEffect(() => {
        axios.get("http://localhost:4000/getPeeps").then((response) => {
            setPeeps(response.data);
        })
    }, [])

    return (
        <>
            {
                loggedIn &&
                < Createpeep user={user} setPeeps={setPeeps} getPeeps={getPeeps} />
            }


            <div className="pt-5  m-5">
                {
                    peeps.slice(0).reverse().map(peep => (
                        <Peeps
                            key={peep._id}
                            id={peep._id}
                            author={peep.author}
                            peepText={peep.message}
                            peepDate={peep.timeStamp}
                            authorName={peep.name}
                            user={user}
                            replies={peep.reply}
                            loggedIn={loggedIn}
                        />
                    ))
                }

            </div>

        </>
    );
}

export default Homepage;