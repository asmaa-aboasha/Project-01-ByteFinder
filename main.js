//populating the 'popular recipe' slider
getPopularRecipes();

function getPopularRecipes() {

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    //reporting if api call throws error
    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({

        url: "https://api.spoonacular.com/recipes/random?number=4&apiKey=" + apiKey,

    }).then(function (response) {

        var popRecipes = response.recipes;
        console.log(popRecipes);

        const showRecipes = (recipes) => {
            for (let i = 0; i < recipes.length; i++) {
                $(`#slider${i}`).attr('src', recipes[i].image);
                $(`#slider${i}title`).text(recipes[i].title);
                let summary = recipes[i].summary.split('. ');
                let oneLine = summary[0];
                const cleanHTMLresponse = (oneLine) => {
                    let splitLine = oneLine.split('<b>')
                    oneLine = splitLine.join();
                    splitLine = oneLine.split('</b>');
                    oneLine = splitLine.join();

                    $(`#slider${i}desc`).text(oneLine);
                }
                cleanHTMLresponse(oneLine);
            }
        }

        showRecipes(popRecipes);

    }, onReject);
}

//search for recipes 
// function recipeSearchCall(userInput) {

//     const apiKey = 'ca76d8942af543f39553ed0542c27990';

//     //reporting if api call throws error
//     const onReject = (errThrown) => {
//         console.log(errThrown);
//         console.log(errThrown.responseText);
//     }

//     $.ajax({

//         url: "https://api.spoonacular.com/recipes/complexSearch?query=" + userInput + "&number=30" + "&apiKey=" + apiKey,

//     }).then(function (response) {
//         const data = response.results;
//         searchResultRender(data);

//     }, onReject);

// }

//search for recipes here
$('#recipe-search').on('change', () => {
    let userQuery = $('#recipe-search').val();

    const inputChecker = (input) => {
        if (parseInt(input)) {
            console.log('number detected');
            return;
        }
        else {
            let rawInput = input.replace(/\s+/g, '');
            return rawInput;

        }
    }
    // inputChecker(userQuery);

    let rawInput = inputChecker(userQuery);
    //recipeSearchCall(rawInput);
})



//get searched recipe by recipe.id value
function getRecipeCall(id) {

    const apiKey = 'ca76d8942af543f39553ed0542c27990';

    const onReject = (errThrown) => {
        console.log(errThrown);
        console.log(errThrown.responseText);
    }

    $.ajax({

        url: `https://api.spoonacular.com/recipes/${id}/information?apiKey=${apiKey}`,

    }).then(function (response) {

        console.log(response);

        //appending title and image for api response
        $('#testContainer').append(`<h1>${response.title}</h1>`);
        $('#testContainer').append('<div class="divider"></div>');
        $('#testContainer').append(`<img class="materialboxed center-align" style='width: 300px; margin-top:5%;' id='${response.id}'>`);
        $(`#${response.id}`).attr('src', `${response.image}`);

        //creating div for recipe information
        let infoEl = `<div class='row valign-wrapper' id='${response.id}-info'></div>`;
        $('#testContainer').append(infoEl);

        //rendering recipe information and summary
        $(`#${response.id}-info`).append(`<div style='margin-top:2%;' class='col'>Servings: ${response.servings}</div>`);
        $(`#${response.id}-info`).append(`<div style='margin-top:2%;' class='col'>Cook Time: ${response.readyInMinutes} min</div>`);
        $(`#${response.id}-info`).append(`<div style='margin-top:2%;' class='col'>Likes: ${response.aggregateLikes} <i class="material-icons">thumb_up</i></div>`);
        $(`#testContainer`).append(`<div class='col s7'>${response.summary}</div`)

        //creating ingredients list
        $(`#testContainer`).append(`<div class='col s4' id='${response.id}-item-parent'><h4 style='margin-top:0; border-bottom:1px solid #c0c0c0'>Ingredients</h4></div>`);
        $(`#${response.id}-item-parent`).append(`<ul id='${response.id}-items'></ul>`);

        //populating ingredients list function
        const listItems = (itemArr) => {
            itemArr.forEach(item => {

                console.log(item.original);
                let li = `<li style='padding-bottom:3%;'><i style=' vertical-align: bottom'class='material-icons'>add_circle</i> ${item.original}</li>`;
                $(`#${response.id}-items`).append(li);

            })

        };

        //making ingredients list
        listItems(response.extendedIngredients);

        //instructions list
        let listParent = `<div class='col s6'><ol id='${response.id}-steps'>Instructions</ol></div>`;
        $('#testContainer').append(listParent);

        const listSteps = (stepArr) => {
            stepArr.forEach(step => {
                let li = `<li style='padding:1%;'>${step.step}</li>`
                $(`#${response.id}-steps`).append(li);

            })

        };

        listSteps(response.analyzedInstructions[0].steps);



    }, onReject);
}

// function searchResultRender(data) {
    
//     for (let i = 0; i < 16; i++) {
//         let cardParent = document.createElement('div');
//         $(cardParent).addClass('col s3');
//         //console.log(cardParent);

//         let cardBody = `<div id='card${0}' class="card"></div>`;
//         ;

//         let cardImgParent = `<div class='card-image waves-effect waves-block waves-light'></div>`;
//         let cardImg = `<img src="${data[i].image}"></img>`;
//         $(cardImgParent).append(cardImg);
//         $(cardBody).append(cardImgParent);
        

//         console.log(cardParent);

//         let cardContent = `<div class="card-content"></div>`;
//         $(cardBody).append(cardContent);
//         let cardTitle = `<span class="card-title grey-text text-darken-4">${data[i].title}<i class="material-icons right">more_vert</i></span>`
//         $(cardContent).append(cardTitle);
//         let recipeLink = `<p><a data-id=${data[i].id}>Read More...</a></p>`;
//         $(cardContent).append(recipeLink);

//         $(cardParent).append(cardBody)
//         if (i < 4) {
//             let row = document.querySelector('#results-row0');
//             $(row).append(cardParent);
//         }
//         else if (i > 3 && i < 8) {
//             let row = document.querySelector('#results-row1');
//             $(row).append(cardParent);
//         }
//         else if (i > 7 && i < 12) {
//             let row = document.querySelector('#results-row2');
//             $(row).append(cardParent);
//         }
//         else if (i > 11 && i < 16) {
//             let row = document.querySelector('#results-row3');
//             $(row).append(cardParent);
//         }
//     }

// }


