let searchbar = document.getElementById("searchProfiles");
/*
// list all users ---------------------
router.get("/users", protect, async function(req, res, next){
    try {
        let data = await db.getAllUsers();
        res.status(200).json(data.rows).end();
    }
    catch(err) {
        next(err);
    }
})

*/
function getUsernames() {
    url = "/users"

    let cfg = {
        method: "GET",
        headers: {
          "content-type": "application/json",
          authorization: token
        },
      };

        try {
          let response = await fetch(url, cfg);
          let data = await response.json();

          if (response.status != 200) {
            throw data.error;
          }

            return data;
    } catch (error) {
          console.log(error);
        }
      }
}
searchbar.addEventListener("input", function() {
    let input = searchbar.value
    if (input === "" || input === " ") {
        console.log("empty")
    }else{
        let test = getUsernames();
    }
    
})


