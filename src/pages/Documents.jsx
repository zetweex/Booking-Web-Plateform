import React, { useState, useEffect} from "react";

import TextFieldAuth from "../components/TextFieldAuth";
import Button from "../components/Button";
import TextField from "../components/TextField";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar/Navbar";
import UserProfile from "../components/updateProfile";
import SelectLanguage from "./Modals/SelectLanguage";
import UpdateProfile from "./Modals/UpdateProfile";
import UploadFile_M from "./Modals/UploadFile";

import { IoImage, IoDocumentText, IoTrash, IoDownload, IoChevronDownCircle, IoAddCircle } from "react-icons/io5";

import { MdAdd, MdAddBox, MdTextSnippet } from "react-icons/md";
import FlagFr from "../assets/fr_flag.png";
import FlagEn from "../assets/en_flag.png";

import i18n from "../assets/Translation/i18n";
import {withTranslation} from 'react-i18next';

import API from '../api';


export default function Documents() {
    const [displayUploadModal, setDisplayUploadModal] = useState(false);
    let [displayFiles, setDisplayFiles] = useState([] );

    useEffect(() => {
        getFiles();

    }, []);

    let deleteFile = (id) => {

        API.delete('/user/media/' + id, {
            headers:{
                id: localStorage.getItem('id'),
                authorization: localStorage.getItem('access_token')
            }
        }).then(res => {
            console.log(res.data)
            getFiles()
        }).catch(err => console.log(err))
    }

    function getFiles() {
        console.log('getFiles =================>')
        API.get('user/media', {
            headers:{
                id: localStorage.getItem('id'),
                authorization: localStorage.getItem('access_token')
            }
        }).then(res => {
            let data = res.data.data
            let files = []
            data.forEach(element => {
                files.push(<File title={element.name} date={element.date.split('T')[0]} link={element.url} deleteFile={e => deleteFile(e)} id={element._id}/>)
            });

            setDisplayFiles(files)
        }).catch(err => console.log(err))
    }

    function addFile(e) {
        let formdata = new FormData();
        formdata.append('file', e.target.files[0]);

        API.post('/user/media', formdata, {
            headers:{
                id: localStorage.getItem('id'),
                authorization: localStorage.getItem('access_token')
            }
        }).then(res => {
            getFiles()
        }).catch(err => console.log(err))
    }

    return (
        <div>
            <Navbar/>
            <div className="documents-page">
                <div className="documents-canvas">
                    <div className="documents-canvas_header">
                        <h1>Documents</h1>
                        <span>Tous vos documents sont là !</span>
                    </div>
                    <div className="files">
                        {displayFiles}
                    </div> 

                   {/* <button onClick={getMedia}>media</button>
                    <input type="file" name="file" onChange={(value)=>docChange(value)}/>*/}
                    <div className="document-canvas_header"></div>
                    <section className="documents-canvas_footer"/>
                </div>

                    <label className="add_button-label" for="input-file">
                        <MdAdd className="add_button-icon"/>
                    </label>
                    <input type="file" id="input-file" onChange={(e) => addFile(e)}/>
                    
            </div>
            <Footer />
            {displayUploadModal === true && <UploadFile_M CloseTab={() => setDisplayUploadModal(false)} />}
        </div>
    )
 }

 function File({title, date, deleteFile, id, link}){
     return (
         <div>
             <div className="file">
                <div className="info">
                    <MdTextSnippet className="type"/>
                    <span className="text">Titre : {title}</span>
                    <span className="text">Date : {date}</span>
                </div>

                <div className="actions">
                    <div className="download_div">
                        <a href={link} className="download_link">
                        <IoDownload className="download"/>
                        </a>
                    </div>
                    <IoTrash className="trash" onClick={() => {deleteFile(id)}}/>
                </div>
            </div>
         </div>
     )
 }
