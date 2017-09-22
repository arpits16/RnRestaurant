// Contains utiltiy function


const apiKey = 'cc5b9f3ad0c0575f1227c608b4c3d557';
const baseUrl = 'https://developers.zomato.com/api/v2.1/'

const headerVals = {'Accept': 'application/json',
                'Content-Type': 'application/json',
                'user-key': apiKey};



module.exports = {

    // Function one to search restaurants with given city id and type
    getCity: function(entity_id, entity_type, responseCallback) {
        const queryParameters = {
            first: entity_id,
            second: entity_type
        };
		
		fetch(`https://developers.zomato.com/api/v2.1/search?entity_id=${queryParameters.first}&entity_type=${queryParameters.second}`,{
        //fetch(baseUrl+'search?entity_id=${queryParameters.first}&entity_type=${queryParameters.second}', {
            method: 'GET',
            headers: headerVals

        }).then((response) => response.json()).then((responseData) => {

            console.log(responseData.restaurants);

            // TODO yet to add check for errors and send response accordingly
            responseCallback(responseData.restaurants);

        }).done();
    },

    // Function to access the reviews
    getReviews: function(resId, responseCallback) {

      fetch(baseUrl+'reviews?res_id=${resId}', {
        method: 'GET',
        headers: headerVals

      }).then((responseNew) => responseNew.json()).then((responseData) => {

        // Note : returned in response is an array
        console.log(responseData.user_reviews);


        // TODO yet to add check for errors and send response accordingly
        responseCallback(responseData.user_reviews);

      }).done();

    }

};