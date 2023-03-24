
// data
import DataCountries from './data/DataCountries.js';

// selects
import selectCountry from './search/selects/select-country.js';

// search
import Search from './search/Search.js';

// tables
import UsersTable from './tables/UsersTable.js';
UsersTable.showInitRow()

// requests
import RequestGet from '../../../../javascript/requests/RequestGet.js';

async function preparePage() {
    Swal.fire({
        icon: 'info',
        title: 'Please Wait...',
        html: '<i class="fa fa-spinner fa-spin"></i> Preparing Page...',
        showConfirmButton: false,
        allowOutsideClick: false
    });

    // fetch data from server
    const response = await RequestGet.send('./php/file.php', {}, 'fetchInitData')
    /*
        Example of response:

        {
            "state": true,
            "countries": {
                "dataFound": true,
                "data": ["Australia","Canada","Denmark","India","Iran","New Zealand","Norway","Ukraine"],
                "errors": []
            },
            "countUsers": {
                "dataFound": true,
                "totalUsers": "10",
                "teenagerUsers": "0",
                "errors": []
            }
        }
     */

    // fake request timer
    setTimeout(() => {
        Swal.close()
    }, 500)

    // check if response succeeded
    if (response['state']) {
        // check counties from response
        if (response['countries']['dataFound']) {
            // get counties from response
            const countries = response['countries']['data']

            // add counties as options to the select
            selectCountry.put_options(countries)
        }

        // check count of users from response
        if (response['countUsers']['dataFound']) {
            // update users count labels
            document.querySelector('#count-users').innerText = response['countUsers']['totalUsers']
            document.querySelector('#count-teenager-users').innerText = response['countUsers']['teenagerUsers']
        }
    }
    else {
        // show errors from response
        Swal.fire({
            icon: 'error',
            title: 'Ops...',
            html:
                response['errors'].map(error => {
                    return `
                            <div>
                                <h6>${error['error']}</h6>
                                <h6>Error Code: ${error['errorCode']}</h6>
                            </div>
                        `;
                }).join('')
        })
    }
}

await preparePage()