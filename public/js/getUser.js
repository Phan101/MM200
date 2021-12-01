//get token
async function getDecryptedToken(token){
    let url = `/auth`;
    
    let cfg = {
        method: "GET",
        headers: {
            "content-type":"application/json",
            "authorization":token,
        }
    }

    try{
        let response = await fetch(url, cfg);
        let data = await response.json();
        if(response.status != 200){
            throw data.error
        }
        data = JSON.parse(data)
        return data
    }
    catch(error){
        console.log(error);
    }
}
//# get token