var request = require("request");
var config = require("./config");
var async = require("async");

var instaMoJoFunctions = {

    createPaymentRequestLink() {
        this.init((err, data) => {
            //console.log("_____________________________________");
            if (err) {
                console.log(err);
            }
            else if (data) {
                //  console.log("&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&")
                var options = {
                    method: 'POST',
                    url: config.ENV_CONFIG.settings.BASE_URL + 'api/1.1/payment-requests/',
                    headers:
                    {
                        'content-type': 'application/x-www-form-urlencoded',
                        'postman-token': '2af84626-7538-5bb0-2d5d-77d3f8de4b4b',
                        'cache-control': 'no-cache',
                        'x-auth-token': config.ENV_CONFIG.settings.AUTH_KEY,
                        'x-api-key': config.ENV_CONFIG.settings.API_KEY
                    },
                    form: data
                };

                request(options, function (error, response, body) {
                    if (error) throw new Error(error);

                    console.log(body);
                });

            }
        });

    },
    init(callback) {
        //Mandatory Fields (amount,purpose)
        // console.log("&ASASASAS");  
        var data = {
            allow_repeated_payments: true,
            amount: 10,
            buyer_name: "Gupshup Technologies",
            purpose: "CS tournament entry fees",
            redirect_url: "",
            phone: "7039022979",
            send_email: true,
            webhook: "",
            send_sms: true,
            email: "shantanu.madane@gupshup.io",
        }
        if (data.hasOwnProperty("amount") == false || data.hasOwnProperty("amount") == null || data.hasOwnProperty("amount") == undefined) {
            var err = {
                "status": "400",
                "error_msg": "Mandatory field 'amount' is missing"
            }
            callback(err);
        }
        if (typeof data["amount"] != "number") {
            var err = {
                "status": "400",
                "error_msg": "Amount must be a number"
            }
            callback(err);
        }

        if (data.hasOwnProperty("purpose") == false || data.hasOwnProperty("purpose") == null || data.hasOwnProperty("purpose") == undefined) {
            var err = {
                "status": "400",
                "error_msg": "Mandatory field 'purpose' is missing"
            }
            callback(err);

        }
        // if(data.hasOwnProperty("redirect_url")==false || data.hasOwnProperty("redirect_url") != null || data.hasOwnProperty("redirect_url") != undefined){
        //     var err = {
        //         "status": "400",
        //         "error_msg": "Mandatory field 'redirect_url' is missing"
        //     }
        //   callback(err);
        // }
        //  if(data.hasOwnProperty("webhook")==false || data.hasOwnProperty("webhook") != null || data.hasOwnProperty("webhook") != undefined){
        //     var err = {
        //         "status": "400",
        //         "error_msg": "Mandatory field 'webhook' is missing"
        //     }
        //   callback(err);
        // }
        if (data.send_email == true || data.send_email == "true") {
            if (data.hasOwnProperty("email") == false || data.hasOwnProperty("email") == null || data.hasOwnProperty("email") == undefined) {
                var err = {
                    "status": "400",
                    "error_msg": "You have set send_email to true but phone value is missing"
                }
                callback(err);

            }
            else if (data.email) {
                if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(data.email))) {
                    var err = {
                        "status": "400",
                        "error_msg": "Please specify an valid email address"
                    }
                    callback(err);
                }
            }
        }
        if (data.send_sms == true || data.sms == "true") {
            if (data.hasOwnProperty("phone") == false || data.hasOwnProperty("phone") == null || data.hasOwnProperty("phone") == undefined) {
                var err = {
                    "status": "400",
                    "error_msg": "You have set send_sms to true but email value is missing"
                }
                callback(err);

            }
            else if (data.phone) {
                var pattern = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[789]\d{9}$/;
                if (!(pattern.test(data.phone))) {
                    var err = {
                        "status": "400",
                        "error_msg": "Please specify an valid phone parameter"
                    }
                    callback(err);
                }
            }
        }
        if (data.redirect_url) {
            var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            if (!(pattern.test(data.redirect_url))) {
                var err = {
                    "status": "400",
                    "error_msg": "Please specify an valid redirect_url parameter"
                }
                callback(err);
            }
        }
        if (data.webhook) {
            var pattern = /^(http[s]?:\/\/){0,1}(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
            if (!(pattern.test(data.webhook))) {
                var err = {
                    "status": "400",
                    "error_msg": "Please specify an valid webhook parameter"
                }
                callback(err);
            }
        }
        callback(null, data);
    },
    listPaymentRequest(dataObj) {
        var payment_req_arr = false;
        var options = {
            method: 'GET',
            url: config.ENV_CONFIG.settings.BASE_URL + 'api/1.1/payment-requests/',
            headers:
            {
                'postman-token': 'd2d67e7b-a9a7-5e9f-958a-983d39f7e4da',
                'cache-control': 'no-cache',
                'x-auth-token': config.ENV_CONFIG.settings.AUTH_KEY,
                'x-api-key': config.ENV_CONFIG.settings.API_KEY
            }
        };
        if (dataObj) {

            if (Object.keys(dataObj).length) {
                var keys = Object.keys(dataObj);
                if (keys.indexOf("payment_request_id") >= 0) {
                    var index = keys.indexOf("payment_request_id");
                    if (typeof dataObj["payment_request_id"] == "string") {
                        if (dataObj["payment_request_id"] != undefined && dataObj["payment_request_id"] !== null && dataObj["payment_request_id"] != "")
                            options.url = options.url + dataObj["payment_request_id"];
                    }
                    else if (typeof dataObj["payment_request_id"] == "object") {
                        if (dataObj["payment_request_id"].length == 1) {
                            options.url = options.url + dataObj["payment_request_id"][0];
                        }
                        else {
                            // length greater than one payment_req_arr
                            payment_req_arr = true;
                        }
                    }
                }

            }
        }


        async.waterfall([
            function generateHtml(callback) {
                request(options, function (error, response, body) {
                    if (error) {
                        console.log(err);
                        callback(err);
                    }
                    // console.log(options);
                    //console.log(body);
                    var data = JSON.parse(body);

                    if (payment_req_arr == true) {
                        instaMoJoFunctions.filterPaymentRequestIds(dataObj, data).then(function (result) {
                            data = result;
                            try {
                                console.log("FILTER LENGTH", dataObj["filter"]["fields"].length);
                                if (dataObj["filter"]["fields"].length) {
                                    instaMoJoFunctions.buildCustomHtml(dataObj, data).then(($filteredhtml) => {
                                        $filteredhtml = encodeURI($filteredhtml);
                                        callback(null, $filteredhtml, data);
                                    }).catch((reject) => {
                                        console.log("ERROR", reject);
                                    });
                                }
                            }
                            catch (e) {
                                console.log("NO FILTERING FIELDS");
                                var $html = '<html lang="en"><head><title>List Payment</title><meta charset="utf-8">  <meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body><div class="container"><table class="table"><thead>';
                                $html += '<tr><th>Phone</th><th>Buyer name</th><th>Email</th><th>Status</th><th>Amount</th><th>Url</th></tr></thead><tbody>';
                                for (let i = 0; i < data.payment_requests.length; i++) {
                                    $html += '<tr>';
                                    $html += '<td>' + data.payment_requests[i].phone + '</td>';
                                    $html += '<td>' + data.payment_requests[i].buyer_name + '</td>';
                                    $html += '<td>' + data.payment_requests[i].email + '</td>';
                                    $html += '<td>' + data.payment_requests[i].status + '</td>';
                                    $html += '<td>' + data.payment_requests[i].amount + '</td>';
                                    $html += '<td>' + data.payment_requests[i].shorturl + '</td>';
                                    $html += '</tr>';
                                }
                                $html += '</tbody></table></div></body></html>';
                                //$html = encodeURI($html);
                                callback(null, $html, data);
                            }


                        }).catch((reject) => {
                            console.log("ERROR", reject);
                        })

                    }
                    else if (payment_req_arr == false) {

                        try {
                            if (dataObj["filter"]["fields"].length) {
                                instaMoJoFunctions.buildCustomHtml(dataObj, data).then(($filteredhtml) => {
                                    $filteredhtml = $filteredhtml;
                                    callback(null, $filteredhtml, data);
                                }).catch((reject) => {
                                    console.log("ERROR", reject);
                                });
                            }
                            else {
                                throw new Error("NO FIELDS FOUND");
                            }
                        }
                        catch (e) {
                            //  console.log("NO FILTERING FIELDS");
                            // console.log(data);
                            var $html = '<html lang="en"><head><title>List Payment</title><meta charset="utf-8">  <meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body><div class="container"><table class="table"><thead>';
                            $html += '<tr><th>Phone</th><th>Buyer name</th><th>Email</th><th>Status</th><th>Amount</th><th>Url</th></tr></thead><tbody>';

                            try {
                                if (data.payment_requests.length) {
                                    for (let i = 0; i < data.payment_requests.length; i++) {
                                        $html += '<tr>';
                                        $html += '<td>' + data.payment_requests[i].phone + '</td>';
                                        $html += '<td>' + data.payment_requests[i].buyer_name + '</td>';
                                        $html += '<td>' + data.payment_requests[i].email + '</td>';
                                        $html += '<td>' + data.payment_requests[i].status + '</td>';
                                        $html += '<td>' + data.payment_requests[i].amount + '</td>';
                                        $html += '<td>' + data.payment_requests[i].shorturl + '</td>';
                                        $html += '</tr>';
                                    }
                                    $html += '</tbody></table></div></body></html>';
                                    //$html = encodeURI($html);
                                    callback(null, $html, data);
                                }
                                else {
                                    throw new Error("DATA FOR SINGLE REQUEST");
                                }
                            }
                            catch (e) {
                                //   console.log("_____________________________",data);
                                // for (let i = 0; i < data.payment_requests.length; i++) {
                                $html += '<tr>';
                                $html += '<td>' + data.payment_request.phone + '</td>';
                                $html += '<td>' + data.payment_request.buyer_name + '</td>';
                                $html += '<td>' + data.payment_request.email + '</td>';
                                $html += '<td>' + data.payment_request.status + '</td>';
                                $html += '<td>' + data.payment_request.amount + '</td>';
                                $html += '<td>' + data.payment_request.shorturl + '</td>';
                                $html += '</tr>';
                                $html += '</tbody></table></div></body></html>';
                                //  console.log("HTML___________________________");
                                // console.log($html);
                                // $html = encodeURI($html);
                                callback(null, $html, data);
                                //}

                            }


                        }

                    }



                });
            },
            function (html, resultObj, callback) {
                var options = {
                    method: 'POST',
                    url: 'https://api.gupshup.io/sm/api/facebook/smartmsg/form/create/custom/html',
                    headers:
                    {
                        apikey: config.ENV_CONFIG.settings.BOT_API_KEY,
                        accept: 'application/json',
                        'content-type': 'application/x-www-form-urlencoded'
                    },
                    form:
                    {
                        html: html,
                        title: 'see%20links',
                        callbackUrl: 'https%3A%2F%2Frequestb.in%2Fy9pdbky9',
                        isSingleUse: 'false',
                        hasFBID: 'false',
                        autoClose: 'false',
                        users: 'shantanu'
                    }
                };

                request(options, function (error, response, body) {
                    if (error) {
                        callback(error);
                    }
                    var body = JSON.parse(body);
                    var link = body[0]["embedlink"];
                    var response = {
                        "resultObj": resultObj,
                        "interface_link": link
                    }
                    callback(null, response);
                });

            },
        ], function (err, result) {
            if (err) {
                console.log(err);
            }
            else {
                console.log(result);
            }


        });



    },
    filterPaymentRequestIds(dataObj, data, callback) {
        return new Promise((resolve, reject) => {
            var payment_ids = dataObj["payment_request_id"];
            for (var i = 0; i < data["payment_requests"].length; i++) {
                var obj = data["payment_requests"][i];

                if (payment_ids.indexOf(obj.id) >= -1) {
                    //Keep those elements else remove                   
                }
                else {
                    data["payment_requests"].splice(i, 1);
                }
            }
            if (i == data["payment_requests"].length) {
                console.log("AFTER FILTERING");
                console.log(data);
            }
            resolve(data)
        });


    },
    buildCustomHtml(dataObj, data, callback) {

        //console.log("buildCustomHtml");
        //console.log(data);
        return new Promise((resolve, reject) => {
            console.log(data);
            var fields = dataObj["filter"]["fields"];
            var $html = '<html lang="en"><head><title>List Payment</title><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css">  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"></script></head><body><div class="container"><table class="table"><thead>';
            //$html += '<tr><th>Phone</th><th>Buyer name</th><th>Email</th><th>Status</th><th>Amount</th><th>Url</th></tr></thead><tbody>';
            for (let j = 0; j < fields.length; j++) {
                if (j == 0) {
                    $html += '<tr>';
                }
                $html += '<th>' + instaMoJoFunctions.jsUcfirst(fields[j]) + '</th>';
            }
            $html += '</tr></thead><tbody>';

            if (data.hasOwnProperty('payment_requests')) {
                for (let i = 0; i < data.payment_requests.length; i++) {
                    $html += '<tr>';
                    fields.map(function (field, index) {
                        $html += '<td>' + data.payment_requests[i].field + '</td>';
                    });
                    $html += '</tr>';
                }
                $html += '</tbody></table></div></body></html>';
                resolve($html);
            }
            else {
                // for (let i = 0; i < data.payment_requests.length; i++) {
                $html += '<tr>';
                fields.map(function (field, index) {
                    $html += '<td>' + data.payment_request[field] + '</td>';
                });
                $html += '</tr>';
                //}
                $html += '</tbody></table></div></body></html>';
                resolve($html);
            }

        });
    },
    jsUcfirst(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    },
    createRefund(payment_id, refundObj) {
        var options = {
            method: 'POST',
            url: 'https://test.instamojo.com/api/1.1/refunds/',
            headers:
            {
                'content-type': 'application/x-www-form-urlencoded',
                'x-auth-token': 'da78839cdfbab517e673bc75ce7b718d',
                'x-api-key': '204e3d37a07089330f9095c177522b3c'
            },
            form:
            {
                payment_id: '39cd3d00a49b429d91da75da8dd8d2ae',
                type: 'QFL'
            }
        }
        if (refundObj) {
            if (refundObj.hasOwnProperty("refund_amount")) {
                if (typeof refundObj.refund_amount == "number") {
                    options.form["refund_amount"] = refundObj["refund_amount"];
                }
                else {
                    var err = {
                        "status": "400",
                        "error_msg": "Please specify an valid refund_amount parameter"
                    }
                    //callback(err);
                    console.log(err);
                }
            }
            if (refundObj.hasOwnProperty("body")) {
                if (typeof refundObj.body == "string") {
                    options.form["body"] = refundObj["body"];
                }
                else {
                    var err = {
                        "status": "400",
                        "error_msg": "Please specify an valid body(string) parameter"
                    }
                    //callback(err);
                    console.log(err);
                }
            }
        }

        request(options, function (error, response, body) {
            if (error) {
                console.log(error);
            }
            else {
                console.log(body);
            }

        });
    }
}

var dataObj = {
    "payment_request_id": ["39cd3d00a49b429d91da75da8dd8d2ae"],
    "filter": {
        "fields": ["phone", "email"]
    }
}
//instaMoJoFunctions.listPaymentRequest(dataObj);
instaMoJoFunctions.createPaymentRequestLink();