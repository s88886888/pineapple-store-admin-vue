import axios from 'axios'


const upload = (file: Blob) => {

    const formData = new FormData();

    formData.append("smfile", file);
   return axios.post("/img/upload", formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
                "Authorization": "7wpJzgLrTYle9dxDhb1BIsZfHtSjyqao",
            },
        });

    //备用图床
    /*   formData.append("image", file.file);
    // console.log(img);
    axios
      .post("https://www.imgtp.com/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          
        },
      })
      .then((res) => {
        console.log(res);
      }); */

};


export default upload