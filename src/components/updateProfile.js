import React, { useState } from "react";
import TextFieldAuth from "./TextFieldAuth";
import Button from "./Button";
import TextField from "./TextField";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar/Navbar";
import { my_fetch } from "./RefreshToken";

const UserProfile = (props) => {

    const [firstName, setFirstName] = useState(localStorage.getItem("firstname"));
    const [lastName, setLastName] = useState(localStorage.getItem("lastname"));
    const [address, setAddress] = useState(localStorage.getItem("address"));
    const [picture, setPicture] = useState("");

    const storage = localStorage;

    async function updateProfile() {

        let body_content = {
            firstname: firstName,
            lastname: lastName,
            picture: picture,
            address: address,
        }

        let result = await my_fetch("https://fleepi-api.herokuapp.com/changeFormData",
            'POST',
            {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Access-Control-Allow-Origin": "*",
                "id": localStorage.getItem("id"),
                "authorization": localStorage.getItem("access_token"),
            },
            body_content,
        );

        let value = result;
        
        if (value == 'Success') {
            console.log(value)
            storage.setItem("firstname", firstName);
            storage.setItem("lastname", lastName);
            storage.setItem("address", address);
            window.location.reload(false);
        }

    }

    const handleChange = (event) => {
        if (event.target.title == "first-name")
            setFirstName(event.target.value);
        else if (event.target.title == "last-name")
            setLastName(event.target.value);
        else if (event.target.title == "address")
            setAddress(event.target.value);
    }

    return (
        <div className="updateProfile">
            <div className="edit-page-container">
                <div className="sub-container">
                    <img src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBYWFRgWFhUYGBgaHBgcGBoZGBgaGhwdHBkcHRkYHBgcIS4lHCErHxoaJjgmKy8xNTU1HCU7QDs0Py40NTEBDAwMEA8QHxISHjQrJCQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NP/AABEIAN4A4wMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAAAAgMEBQYHAf/EADwQAAEDAgQDBgUDAgUEAwAAAAEAAhEDIQQSMUEFUWEGInGBkaETMrHB8ELR4VJiByNygvEUFSSSorLC/8QAGQEAAwEBAQAAAAAAAAAAAAAAAAECAwQF/8QAIhEAAgICAwEAAwEBAAAAAAAAAAECESExAxJBURMiYTIE/9oADAMBAAIRAxEAPwDpGF1VuzRU+F+ZXDNFgWOIQhWSRsbim02lzp5AAFzidmtaLuJ5BYrtH2hcGnvsYbxTDs1S4tJaYYTOjgCIOuiqe3vHpdkJObL3aYmGMePmeBdz3N/SSA0EanTAve52jweQcB6AaJpWawj6T8XxZ7j3i4+JzR4Aj6KC6r+pjvG/tdR31Ys9seGnpKae39TT46+6tI0JL6ubxUelVLXdCmy+UZZ+xTEPVHQTGmo+oKfp15Ecvp/BkKK0GIO2n7LzKZn86pDJXxoIPkev4PdS6Nfcb+zhofMgKrcE8x5Ee/7pMC4/6oFpg8rHUbz7rQ8E4q4htzIseZFoP5yWLZIdO32OyueD/qGhBaBAmZdGnmPVYckcWaQdumdZ4VjnWJMh32F1oQVkuDHLlnwA8GjNPmYWrp6LPgm5WmY88UngUhCF0GAIQhAAhCEACEIQAIQhAAhCEAUeG+ZXFPRU+G+ZW9PRQUOpnFVcjHu/pa53oCU8s9234i2hhHud+qGgcybn2BViStnF+JYk1Hl7pl0TrMwBLiTqY2tOihuf+fymcZiy93dFyeX2V/wbs890F0yqb6o6oxsrqNNzhGWRyO3glf8AanagFbqhwcNHyp48P6Qs+zNFGJz48Md/R9kulwx3Ix4LeHhwTjMAAjsw6xMK7hpA09pTTuHHUAroZ4e3lKaPDxyR2YusTnhwDtIK9p4Fx2P51W/PDhyS6fD2/wBIVKTJcUY/D8IeYsp9Hg72ua5uoIO8d0yJ81sKOEA2VlQogbIaslySM7w3ib6Ya17CMoymOriSZ2On5pvcHj2PaC020uCPdVOKwDHsIgTFlkMLxN9F5Y4mAbg6arFQ6NtCk1yI6mhU3AuI525TqNFcrSMuyswlFxdMEIQqJBCEIAEIQgAQhCABCEIAosL8yuKeipsL8yuqWigocC5Z/i1i3F9Ol+lrc3+5xI9g33XU1yT/ABHE4p0n9LB4W2VraHDZn+xXA/i1S9w7rPSSun0ME1g0VR2MwmTDgxBcST9loXlN7NHJ6Ij2JosT7k2SpZohosC9DV65yAUh5ABeFiUvJQAgU0trF7K8LkWAtqkMcoYcnmOVpmcok7P3dViu1mEgtqgbw5awvsoPFKGem5p5KXsUcC+wtXMwncQJ6arZhc77BOLHvZtE+YP8rogUQVNonl2CEIWhkCEIQAIQhAAhCEACEIQBQ4b5lc0tFTYb5lc0tFDZQ6uV/wCIOH/8wH+pjCPcfZdUXN+318WwTpTafV7/ANlaHDZccLbFJo6KS52ygcLqdwBTSVDZqlkbem3Jbl5lRs0WBAbdBalwkp0KzxCGuSgnQxAC8LE4lQihXQzCWxeli8hAm7FuekVn90rx6jYlxiEmTRG7OPy4mIsZB6bhdDZoFzzgndrg3kmHCOekHnMeRK6EzQKIP9mTzLQpCELUxBCEIAEIQgAQhCABCEIAocN8yuKOipsP8wVzRUMoeC5523Z/5tPrTaT1Ie+AuhBYPt1QjFYd+zmub5tdP/7VDh/ocwLCAFYU2yomGu0KTiMQ2myXKVlm7wKc2E256zXEO0pnuaeX3VW/tM/RN/wqMfptH1E26oFi2dpnyQQPVWGG4zn6KW2jWMEzSMeJS3PCrMDUzEn89UnFYsNJCXYT48lmaoXgrjmsxiuLRYH/AJVJiuJvmQ4jpP5KcW2KUUjogxTeYUim8HQhcvZj3n9R9/op2G4i9pEE+c/fRaWZOB0GsxQqzVG4Xx3P3HxfQ/srHEU1MhK06ZH4UWtrNmBmEDqQdPGFt6RkBc1fWy1YjTvCIN23Gvn6rouCdLGn66rKOJE8qwmSEIQtzAEIQgAQhCABCEIAEIQgDPYY94K6oaKjw3zBXlDRZsoelc/7e49rn0GtBlheSehyiAVvn3BC5txWlnaCR3mPDb+MJ9laX004odrfwvMC2WA6Ki40173nUNFhyjwlaLCtysG9p/AqLHML5s49AAJ6F02UydaN+NJytmUxNBokkjqdG+pPNU1TE0wYb3vAEj3Ila0cBc94e9wkfK0QWNG3diD5pnE8BJJ+WJLhDRYm52tf82Ti16y53f6ozeGqE3yNjTvMI8pmJV5hqbDBy5SnDw1zW5MwyySbAkkmb2U/A8NaBBe4+WngeXRRKno0i2lksOFUjcyo/FcIS0u5K44dSgFLxVPM0qoxwZyn+xzqo86RJTDXvJMSY2aBYcyTotFicA2Hag3uNVAw2Gaw2c5o5/vzTpeg23orGcQc0gFrridWkxsflU7DYsOIiCeTm5XeWocrFnDmEAAyIjU/unX8IY4ARpABEyI0iBZN14JOS2GFykgwQdeX/K19B4ewcxYrN4fh5AAnN/qafsr3hpLQQY9Yjyy/dSsE8lNWjN8bBFTeNLKz4bxF7WEucTB7gJPJN8eoy9sWzFSG0Rki0xI8tkpuljZfDFSa7aNvwrEmpSa8iCQZ8iR9lNUDgrIoUx/bPrf7qetY31VnDyJKbS1YIQhMkEIQgAQhCABCEIAzeGPeCvKCz+Gd3gr/AA5WZQ+FiONsDczdy+fInX/1W4WK7X0/8y1pbPo0n7JSxTNv+fLcfqJrj3YiRH4FCqt8OWlh0A/UU9nlrSN4APjv6IcAk8s0SogvnZzvRo+gTD6E6lx81YliaexOkaqRCbhWi8DzTrGbBPBgGqdoBs2uigv0ewzYCTVFinm2CZcVcTJq8lZWpSVHdhxuFYVHGSAB5qA3HDNlcIKHSKjbPBgWch9PopDMPAgQfESnqYBuE+1iVIGxplONZb1F2+YOn5dSqTCSGx3tr2PgfsgBeExoYgyOhGhSaIeROOwLnlgIiHST0Ek/RQqVOKmUGbfXZajH1Q1gdEGATEausQOkkmd1RYDDk1Q/ZzgB66rGSbkn8N+GVccrNrSZlaANgB6BLQhdSPOBCEIECEIQAIQhAAhCEWBlcNqFe4dypqTbq2oFTJUNMnArP9o6UkOiXNAj1Kuw9VnFqZPfE6QY26qXo14nUkyhwc5BMgttB/OSkyFHD7uEybH7fYJL6imzpq3Q+96hYnFBqbxOLgaqoc9zzOjeaTkaxh6ycyuXmxKscIBGseJVdhKjQMrdtf5UfH1rDK8t8Im6Fexung0T6giBso764GpVHh8bDYNQOcOYDXeeyjYvGl1pT7OwUI1s0bqrHEkOHVU2OYHPsbRM9VR1H5tHm20wPTVyk0sS0CAZ09dldNmf6x0yzw2JLTBVnTxVrrPfHBsf+FKo4m4BOuh2P8rN3EuoyL0YleOxEqrNQhKbUO6rtZnKKRoMZWDqVMEmMsHxbICXwl8OY2LZrIbgHuYxzSPkAh1vMHmpfC8C5hzPIzbAXA6zzUxM3KKg8l/mRmUQ1EB6uzlJcr2VEFRK+KnbAkyvJUU1ihtRKxUS5RKZa9KlFhQuV6m5QmMoGaqyolVNJ11Z0SqkJEoFJJRKQ4qEDKrjjQAwgbkSOom//qqPEmArXtRXy02/6x5i4P1VHRxLXMAnWYvqBv4KZI6uB4Kl7s9TK75Rd3Xk3zv6JrHcQGYMFuXJO1GFoeQJlw9I/PVZ17y50wbT5Dw3tZKKOmUr0Woxr8tr2MjaLR9kjO8jNtaevgeSjcP4rSLxTAe5zrfLufGDOi01LDOAMU3QCAehItp4q3KvCEr9Mrj6kSQI8VGfinkC/wCdfKFrsRhRMPoyYm7SCQN+uvuoUMDu7Sbm8CfZCaK/G3lMoqDXfNlmeYTgYRAg6+s7fRX9LDVHd1tO8TcZRF9z1BUathKoAcGtGYON9QBGvqqUjKSivSoqVXNN07Sxc2JiYjodoUBr6r6rmQ0wYJAsLn9lOq4VoIHn5/l0pf0I/UXGGrlzQd9D4ix8FMLw3Xloq7Cd1kXubedgn+Hk1KzGzAztbPOLmPp5rPSZc5XR06mIawf2j6LwlVNPtDSOJfhy4DJlax02Lsolh5EH9tbKzdZVHRxNZyLlegpsFKBTJHAvF4CglAAV6CkFehIB1pSwU0ClSmA5KE3KEAUFFWFKoo7WozKvALBtRDnqKx6cqVMrS47CUkJmY7Y4oZct7DW1iYvc6xss4x+QZhtGu4JBjkDB16K04w4PEu0JINwLO/3DeLTus3hsVnaWCS8d3aLCRBncCPWFpKODbidYLl+KY4d0iDFvLf3VHhGxWgixJjkfXzS6ToJgyCCW9NzHoUyxgFZmsSOcA7+Go9lmom3YvMTwJjntqM7j2wZGljN+d1ecP4xlBbWYWkNnOLtdlNgIvmI6bG+iboOloPhv990sPbo76W05JJ/S3FS2WP8A37DF7R8RoJabuDmgaWLnABp6Epp3F8M15mtSDi23fZz0mfZVtamw6FvqPumfhtywA2RpcdFVk/gX1krE8fph5yNe+2rWw0m9sziPUWuq3G1KlWze4wNaCY7xMkuA2g2HqlEjctHgbpL62wNuqqw/FGP9I9LCtYIbvJJ5lV9cQ8EiRpG8q5DgJ6TPTdUVSoHy52YawdhaLeP2SqxOQ1UxhDTFpOb6xHqFoOyVJjPiYl/yUWudtqGk72nSOsLIZpdp3W2M+G/qPVarjbzS4d8FjQHuDfjd45gM2bK5uztARyspmnhL0izIV8cX1X1BLc73vibjM4uifNdG7J9q/iZaNYw+wY8n5uTXdfr9eVUjIT7Xlu6px8BpNHfSISgVhuyXa0Foo4h3RjzsNg/ptPqtuRChqjFqhzMvC5IlEpWSKlKCQCvQUihwFKlNgpUpkipQkShMCpFQJJqXTPwyvHsKY6JTXjmmuJ1/8pwGpgeqaY0pjHTkPQjVEdoKKGpNtDFtd7DXmshxt7qT/iMcb/MJPS+XOXAXsTGug0WprGHQTHgdLwSfZQOJ4TMwtmNJaSY6EAEAGziSZgARGh6RrBTMrhwLmkusT7gjwEqZhm54sXZnAmTAEfKSBsBf8CylGs6i8sM6wZkGPO4Ws7PYhmYm8WgTrBkCecn0985Ro1UjS4HEsIdEmDGkC36RO4upBLXeJn25+yz+JxD2vADS1thOhM39pEeflbU8W0RBnW+0bz1/ZZSiaRkRMbTI0vAMCTEkxf1B8lVS4GATJFhOvn9/4V5jWFw115bcvsq3/oiBNrcx11k+aIotv4RqTC4xPvtFrK1oU8v59vzRN4bCZTrYnnf+E5jqgYJ0HPqZ/bWIVqJLlgj4x4+XpJjlMbdJUDEwGEm4az1JAge49DqvKmID3ggXBtBiSI8ojnOpTXHavcawCAcpJNzI7pjloB+W0qjBytlbSeARN5uTPPXXexUrDVi59y7I2zhO3WVGxNMilnNySA3/AEzMqPgq0uymA1xE8ki0r2Lx9BjHnI7Mw3afHZIYZF1Y8SpMY34Yv+pro3P6ZVUwpNCtXgdZIvstr2Y7XmkG06gLqWgOrmeHTosYw2K8AI/PdJq9ieTvFGqx7Q9jg9h0cPGPJLhcg4Dx+ph35mOlri3Ox3yuEyR01Nx0XTeE8Yp4hmZhhwAz0ybtJnT+oSDcLNxozlGizhACazpQclRNjwCUAmQ9eioigHcqE38RCKAr4XuQFIa9Ka9Z2aULbTCo+0GJykMHi7pNgr1zwBJ0WD4/XL35+cxe/IW/NFtxRt2SxNZ3eJJkm19fl1+v8XlmtDjtYEiRpBzSZB5DYkcjMJLahcwPgTl5xB5fS/Qcl5Qc4DK4ECJvyNiInukZov4aytwMp2lwQEPaBA7pINvD5GiQIs2YmbAia7hePNN4N4uD4EXW2xzA9oblBD2tAi5cA0gGc7WtaAAO9uQJkiMFi8PkdG2xsQQdCCLHxFlRS+G7w+I+Ll70NIsZAjUn5f7QdNyFZUmkRlb/AEh0XjUGOUGR/t9cDwvihpwDcDQnby/NFqsDxZrbGIOWDzuCWho0Munpp1WcojTovTTGRrgLiLX8rDxH4FCq4u0GNDExEGAeqj18YP6pibDcZXOaZ9D+XruIcQblbaQWsIjoZJnxLvblaUjXsXrntBAuI2B1HeF/MAqNjmy2TyJvpaw6AG58p3UfDY2Xd8CIMjQcoE6S0xPh0UfiWKENM2AaCNZykiOVwSelxYpomUrB1NgZJEmZMHnNo3IOVs+Cq6bPiOEkQI0m+pN/E/VJr1XVXljJDMxnyMTPWGmOasKVIMbA0VNkxjYjH1AMrdjZVL6GV0D9Wik46p32jxXtZhLMw1BsrSuI3slYXEsax1Jzcz/0mSe99lUkw4yIM6KzoVmtaHMGaqJJ0BG5tuonE62d4eW5c4B0ieqXhOmDH7JchM0h/KembQpGKawxI/NP5Uzh2NfTcHMcWvaQQRsQfe2Yf7oUUPkXBjb3/cJRaDF4vtte3/2SoDqHAeONxADHQytABGjXkEglvIyDLb+Kug0rjNLEEEc7GRrIgj3AtoJJK3fZvtRmIpVnAmwZUEneBmIHeF2d8ws5Q9RDRrMqSWlOyglZEjMFCWhAEFwAEuIaOZMKqx3HmMBDG53XudLf8rL8T40+oYkm/LQRy28FWtxLokEnbT6deXNdMeFLYOTZqn8XLgC83dJaJFthoqPirz06GdbE9PzZLoPljZgQCJkDwgZgmcQ894D5YM2jRrgZJcRp1AWlUJIRhaw77RMA/LN7H201gXT7TMkkSRMz4iB/SRaBtMSSSVV4d8Pj5Wk+oLnQQLE6aR5qa8yNLGN4BtDWkjSznX2FxLnBJlDxAcDnGYOyzrldoTAmbwN7jcCSqfjWDD2l0S8Wk6vjukzMkuLSQCBodbgW7nC8bTJE2MnQbbmNjm1SQ7u5wJILgSHNaMhaCXOJa6wDdIN3aakiA58w3j0Uhj3N0MQZHj4Kf2hw+SoS0akyJad/7SRfUHroIgQmXCHguLTJDce/eLxO0xH7aodiHuM9Z6xa3gm2sTtNqhsrqh+niHgWAHvtH7nxKUzDueRmcYuPKdEugwFT6QhT2L6ofo0gxsD+V5VfC9LlGxD4CAKjGVP8wK4wlPNSd0CzmMf3geq2fBKU0XHofoujiVujKbrJA4TiPgvhrC9z9RAO2gPSVF4uHiWvHyvMWj5hMRspmGrPNE/Dp2aSS4gmSNwdjoofGqtR0F41az7wZ3lTQnmmQqcqXSbfUqFRKlMePO6kCVTJ5ctYtdgKWyLW1In/AOFtPzkmWtIOoN9R0k/RqcwwJN9NCegIHT+0yYCAFMY11vCTysRJMwBmI1PkpOGplxDGAvc4AANa5+Yln9sNAsLkkDLOyMDRNR3cgNaWlzo7rPkIJebSYdAaCbbrcdmKtHDCGtc4uADqj3EuOlgNGtsLDleUpOtA2abDUsrGMJDi1rWkxEkACY2T2RKaGPGZhBlJIXPgzE/DCF4hFIDiLau++uut7X+h8jCGvk3k7nXntyv6FFDQkgG7RuLvki3K3lqJXma5P53nZb+Yv0vqu0ZPFdwacskGJAdlmDBdoY6jaUF4s6Wm1oeyQC0yZIB06GIKZpYg+sX3v3Z6nbqPBKrVXU4lxyS4NZDXBrh0cLttp5JMBjEsj3taLl4Ez4j5pN9FLwjwczDmnWSYsdDfSJsTFyD+kJmvh4aHTb9IFoloeImctmkki5LjeFFw1WCNXN7zYO8Ahw3gdwXuT0SYy1puGrTGkWzCC2WAA/2jPe8TN3pww05YLgcpiJJ7zXEAT3piI0Np3nxwy5TJ1IPlmJMnnr4ho0EILLNO8A6nQyCAdbTZIZT8TZDXtgua12WM7XFphudsAAtAJtFrlVeDz1O4QZEwY2GoPOFOxmVriwtuG91wOoiS1wNomTbmq844seHNkXvfX7aJrIaH62Hcww4RyOxHMHdKb1V7wpwqtayoMzXzkOjmkGNrenoq/iuANCplzZhEg7x16py46VrQ4cibp7I7GxupLHqMwp8PhY0bpkh77KDiqlipAMhV+KN0JEsraxkrpPC8Nlw3+37LnmHp5qjW83Ae661jKIZhnRs1dXCvTm55VSMjwerVyVmUxlZzmcpg/pPPoqXH1nuYwPbAytj1d9VY4LilRtWqO6DlcwEDSIg9dN+ZVTjcW5zWgxoD7lZtGi0MsPJS2xA9vqoVPZSmfnkpAlU2zJdAgX2mAdff13KscNhMzS9/dptMZtHPcQIZTYZl3da7M4QAZ5BI4Rhfi1adMOLBlNQkAS1rbktBsX92xNhPq/xCpmIOjQMrWjRrdgPqTuSUtukDdCq3EXOa1kBrGTla0QBOpP8AU48z7CyfwmP5qnMTunqb1SSWCTZ8K409hnUcltcDjGVmy0idxyXKsLUU7A491JwcwkcxzWfJxp5WxWdO+AhVNHj8tHdPsvVzUyqP/9k=" width="30" />
                    <h1>Edit Profile</h1>
                    <div className="datas-container">
                        <div className="input-container">
                            <h2>Prénom</h2>
                            <TextField
                                title="first-name"
                                onChange={handleChange}
                                placeholder={localStorage.getItem("firstname")}/> 
                        </div>
                        <div className="input-container">
                            <h2>Nom</h2>
                            <TextField
                                title="last-name"
                                onChange={handleChange}
                                placeholder={localStorage.getItem("lastname")}/> 
                        </div>
                        <div className="input-container">
                            <h2>Adresse</h2>
                            <TextField
                                title="address"
                                onChange={handleChange}
                                placeholder={localStorage.getItem("address")}
                            /> 
                        </div>
                        <div className="submiter-container">
                            <Button
                                title="Annulé"
                                onClick={props.callback}
                            />
                            <Button
                                title="Mettre à jour"
                                onClick={updateProfile}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}


export default UserProfile;