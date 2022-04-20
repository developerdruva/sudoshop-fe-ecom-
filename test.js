console.log("hi there.");

let getItems = () => {
    let y = []
    let x = ['a', 'b', 'c'];
    x.map((item, index) =>{
        y.push(item);
    })
    console.log(y);
}

getItems();