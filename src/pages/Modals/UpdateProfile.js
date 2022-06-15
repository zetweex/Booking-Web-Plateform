import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";
import TextField from '@mui/material/TextField';

import Button from "../../components/Button";

const UpdateProfile = (props) => {

    const [firstName, setFirstName] = useState(localStorage.getItem("firstname"));
    const [lastName, setLastName] = useState(localStorage.getItem("lastname"));
    const [address, setAddress] = useState(localStorage.getItem("address"));
    const [picture, setPicture] = useState(localStorage.getItem("picture"));

    const [files, setFiles] = useState("");

    const currentDatasUser = {
        "firstname": localStorage.getItem("firstname"),
        "lastname": localStorage.getItem("lastname"),
        "address": localStorage.getItem("address"),
    }

    useEffect(() => {
        console.log(localStorage.getItem("picture").name)
    }, [])

    async function updateProfile() {

        let formdata = new FormData();
        // const data = new FormData()

        formdata.append('picture', "");
        formdata.append('firstname', firstName);
        formdata.append('lastname', lastName);
        formdata.append('address', address);

        
        // data.append('file', files[0])
        // data.append('upload_preset', 'fleepi_default')

        // const res = await fetch(
        //     'https://api.cloudinary.com/v1_1/fleepi/image/upload',
        //     {
        //       method: 'POST',
        //       body: data
        //     }
        //   )
        // const file = await res.json()

        // console.log(file.secure_url)

        let result = await fetch("https://fleepi-api.herokuapp.com/updateProfile", {
            method: 'POST',
            headers: {
                "id": localStorage.getItem("id"),
                "authorization": localStorage.getItem("access_token"),
            },
            body: formdata,
            redirect: "follow"
        });

        let rq_response = await result.status;


        if (rq_response === 200) {
            window.location.reload(false);
            console.log(picture.name)
            localStorage.setItem("firstname", firstName);
            localStorage.setItem("lastname", lastName);
            localStorage.setItem("address", address);
            localStorage.setItem("picture", "");
        }
    }

    function addFile(e) {
        setFiles(e.target.files);
    }

    return (
        <div className="profile-updater-container">
            <div className="bg-overlay">
                <div className="f-modal">
                    <header className="f-modal__header">
                        <div className="header__button-close">
                            <FaTimes size={20} id="button-close" onClick={props.CloseTab}/>
                        </div>
                        <div className="header__title">
                            <span>Modifier vos informations</span>
                        </div>
                    </header>
                    <div id="header-separator"></div>
                    <label htmlFor="input-file" className="f-modal__pp">
                        <img  src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Circle-icons-profile.svg/1200px-Circle-icons-profile.svg.png" alt="my profile picture"></img>
                    </label>
                    
                    <input onChange={(e) => addFile(e)} id="input-file" type='file'></input>
                    <div className="f-modal__description">
                        <TextField
                            autoFocus
                            onChange={(e) => setLastName(e.target.value)}
                            margin="dense"
                            id="lastname"
                            label="Nom"
                            type="text"
                            fullWidth
                            variant="outlined"
                            placeholder={currentDatasUser['lastname']}
                        />
                        <TextField
                            autoFocus
                            onChange={(e) => setFirstName(e.target.value)}
                            margin="dense"
                            id="firstname"
                            label="Prénom"
                            type="text"
                            fullWidth
                            variant="outlined"
                            placeholder={currentDatasUser['firstname']}
                        />
                        <TextField
                            autoFocus
                            onChange={(e) => setAddress(e.target.value)}
                            margin="dense"
                            id="address"
                            label="Adresse"
                            type="text"
                            fullWidth
                            variant="outlined"
                            placeholder={currentDatasUser['address']}
                        />
                    </div>
                    <div className="f-modal__select-button">
                        <Button onClick={() => updateProfile()} title="Mettre à jour vos informations"/>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateProfile;