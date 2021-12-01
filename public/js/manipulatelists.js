//share/unshare
async function changeAvailability(listID,available) {
    let url = "/changeitemlist";
    let token = localStorage.getItem("token");
    let updata = {
        dbTable: "todolists",
        dbCol: "visible",
        newDbText: available,
        dbID: "id",
        id: listID
    }

    let cfg = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "authorization":token
        },
        body: JSON.stringify(updata)
    }
    try{
        
        let response = await fetch(url, cfg);
        let data = await response.json();

        if(response.status != 200){
            throw data.error
        }

        showAllToDoLists(); //refresh the list
    }
    catch(error){
        console.log(error);
    }     
}
//#share/unshare

//delete all list items
async function deleteAllListItems(listID, itemsData) {
    for (let itemvalue of itemsData){
        if (itemvalue.listeid === listID) {
            deleteListItem(itemvalue.itemid)
        }
    }
}
//#delete all list items

//delete list
async function deleteList(listID){
    let url = "/list";
    let token = localStorage.getItem("token");

    let updata = {
        dbTable: "todolists", 
        dbCol: "id",
        id: listID
    }

    let cfg = {
        method: "DELETE",
        headers: {
            "content-type":"application/json",
            "authorization":token
        },
        body: JSON.stringify(updata)
    }

    try{
        let response = await fetch(url, cfg);
        let data = await response.json();
        if(response.status != 200){
            throw data.error
        }

        showAllToDoLists(); //refresh the list
    }
    catch(error){
        console.log(error);
    }
}
//# delete list

//edit list
async function editList(headerText, listID){
    let url = "/changelist";
    let token = localStorage.getItem("token");
    let updata = {
        dbTable: "todolists",
        dbCol: "header",
        newDbText: headerText,
        dbID: "id",
        id: listID
    }

    let cfg = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "authorization":token
        },
        body: JSON.stringify(updata)
    }
    try{
        
        let response = await fetch(url, cfg);
        let data = await response.json();

        if(response.status != 200){
            throw data.error
        }

        showAllToDoLists(); //refresh the list
    }
    catch(error){
        console.log(error);
    }     
}
//#edit list

//add new list item
async function newListItem(itemText, listID){
    let url = "/newitemlist";
    let token = localStorage.getItem("token")
    let updata = {
        text: itemText, 
        listeid: listID
    }

    let cfg = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "authorization":token
        },
        body: JSON.stringify(updata)
    }
    try{
        let response = await fetch(url, cfg);
        let data = await response.json();

        if(response.status != 200){
            throw data.error
        }

        showAllToDoLists(); //refresh the list
    }
    catch(error){
        console.log(error);
    }     
}
//#add new list item

//edit list item
async function editListItem(itemID, itemText){
    
    let url = "/changeitemlist";
    let token = localStorage.getItem("token");
    let updata = {
        dbTable: "itemlists",
        dbCol: "text",
        newDbText: itemText,
        dbID: "itemid",
        id: itemID
    }

    let cfg = {
        method: "POST",
        headers: {
            "content-type":"application/json",
            "authorization":token
        },
        body: JSON.stringify(updata)
    }
    try{
        let response = await fetch(url, cfg);
        let data = await response.json();

        if(response.status != 200){
            throw data.error
        }

        showAllToDoLists(); //refresh the list
    }
    catch(error){
        console.log(error);
    }     
}
//#delete list item

//delete list item
async function deleteListItem(listItemID){
    let url = "/itemlist";
    let token = localStorage.getItem("token");

    let updata = {
        dbTable: "itemlists", 
        dbCol: "itemid",
        id: listItemID
    }

    let cfg = {
        method: "DELETE",
        headers: {
            "content-type":"application/json",
            "authorization":token
        },
        body: JSON.stringify(updata)
    }

    try{
        let response = await fetch(url, cfg);
        let data = await response.json();

        if(response.status != 200){
            throw data.error
        }

        showAllToDoLists(); //refresh the list
    }
    catch(error){
        console.log(error);
    }
}
//#delete list item