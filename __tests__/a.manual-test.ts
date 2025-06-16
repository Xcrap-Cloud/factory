import { extractAttribute, extractInnerText, HtmlParsingModel } from "@xcrap/parser"
import createParsingModel from "../src/create-parsing-model"

;(async () => {
    const model = createParsingModel({
        config: {
            allowedModels: {
                html: HtmlParsingModel
            },
            allowedExtractors: {
                innerText: extractInnerText,
                content: extractAttribute("content"),
                attribute: extractAttribute<any>
            },
            extractorArgumentSeparator: ":"
        },
        model: {
            "type": "html",
            "model": {
                "title": {
                    "query": "title",
                    "extractor": "innerText"
                },
                "description": {
                    "query": "meta[name='description']",
                    "extractor": "content"
                },
                "author": {
                    "query": "meta[name='author']",
                    "extractor": "content"
                },
                "contentType": {
                    "query": "meta[http-equiv='Content-Type']",
                    "extractor": "content"
                },
                "robots": {
                    "query": "meta[name='robots']",
                    "extractor": "content"
                },
                "lang": {
                        "query": "html",
                        "extractor": "attribute:lang"
                },
                "body": {
                    "query": "body",
                    "nested": {
                        "type": "html",
                        "model": {
                            "paragraph": {
                                "query": "p",
                                "extractor": "innerText"
                            }
                        }
                    }
                }
            }
        }
    })

    const html = `
    <!DOCTYPE HTML>
    <html lang="en">
    <head>
        <meta name="author" content="Deetlist">
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="robots" content="index, follow">
        <meta name="viewport" content="width=device-width" />
        <meta name="keywords" content="dragon city, hayday, mobile games">
        <meta name="description" content="information and lists for gaming, tech and lifestyle!">
        <title>Deetlist</title>
    <meta name="yandex-verification" content="b11e14e4b250ff7c" />
    <meta name="yandex-mydomain" content="www.deetlist.com" />

        
    <script> (adsbygoogle = window.adsbygoogle || []).push({ google_ad_client: "ca-pub-9432529499363823", enable_page_level_ads: true }); </script>
    <!-- <link rel="stylesheet" type="text/css" href="style.css"> -->
    <link href="https://fonts.googleapis.com/css?family=Raleway&display=swap" rel="stylesheet">
    <style>
        body {font-family: "Raleway", sans-serif; }
        #container { width: 80%; margin: auto ; margin-top: 5%;  }
        .bba { width: 120px; height: 120px; display: block; float: left; background-color: #99ccff; margin-right: 5px; text-decoration: none; color: black; text-align: center;  }
        .mma { height: 80px; width: 80px; }
        .mma img { height: 60px; width: 60px; margin-top: 10px;  }
        .rtt { clear: both; margin-top: 5px; }
        .ssr {background-color: #809fff !important; cursor: default; }
    
    .subd { width: 120px; display: block; background-color: #99ccff; text-decoration: none; color: black; text-align: center; margin-top: 5px; 
        height: 50px; line-height: 50px; clear: none; float: left; margin-left: 10px; }
        
        @media (max-width:800px)  {
        /*.bba { clear: both; }*/
        #container { width: 98%; margin-left: 1%; margin-right: 1%;  }
        .subd { width: 45%; margin-bottom: 4px; }
        }
        
    </style>  
    <style>
        body {font-family: 'Raleway', sans-serif; }
        #container { width: 80%; margin: auto ; margin-top: 5%;  }
        .bba { min-width: 320px; width: 90%; max-width: 600px; min-height: 120px; display: block; float: left; clear:both; 
        background-color: #99ccff; margin-right: 5px; text-decoration: none; color: black; text-align: left; margin-bottom: 10px;  
        padding-left: 10px; padding-right: 10px;}
        
        .mma { height: 80px; width: 80ox; }
        .mma img { height: 60px; width: 60px; margin-top: 10px;  }
        .subd { width: 120px; display: block; float:left; background-color: #99ccff; text-decoration: none; color: black; text-align: center; margin-top: 5px; 
        height: 50px; line-height: 50px; margin-left: 5px; }
        
        /*-- Page gets smaller than 800 --*/
        @media (max-width:800px)  {
        /*.bba { clear: both; }*/
        #container { width: 98%; margin-left: 1%; margin-right: 1%;  }
        .subd { width: 45%; margin-bottom: 4px; margin-left: 2% }
        }
        
    </style>
    
    </head>
    


    <body>

    <div id='container'>
        <h1>Deetlist</h1>
        
            <p>
            Welcome to Deetlist, a website for Gaming, Tech and Lifestyle information <br>
            We currently are focusing on games and collection databases (seen below) <br>
            Click any of our existing pages below to read about it!
            </p>
        
            <a class='bba' href='dragoncity'><div class='bb'>
            <div class='mma'> <img src='img/drag.png'> </div>
            Dragon City
            <p>
                See our Dragon City mobile game guide. <br>
                automatically generated from the game files! <br>
            </p>
            </div></a>

            <a class='bba' href='littleshop'><div class='bb'>
            <div class='mma'> <img src='img/shop.png'>  </div>
            Coles Litle Shop 
            <p>
                Our coles minishop database lists all of the mini shops available <br>
                Our site is automatically generated from the game files!
            </p>
            </div></a>
        
                
            <a class='bba' href='pages'><div class='bb'>
            <div class='mma'> <img src='img/wp.png'> </div>
            Blog
            <p>
                When we embark on big projects <br>
                We sometimes document them and post them to our blog! <br>
                Read more about them here!
            </p>
            </div></a>

            <div style='clear:both; height: 0px; width: 100%; '></div>
        
            <a class='subd ssr' href='index.php'>Home</a>
            <a class='subd ' href='about.php'>About</a>    
            <a class='subd ' href='privacy.php'>Privacy</a>
            <a class='subd ' href='contact.php'>Contact</a>
            <div style='clear:both; height: 30px; width: 100%; '> </div>    
            <div style='clear:both; height: 25px; width: 100%; '></div>
        
        </div>
        
    

    </body>

    </html>
    `

    console.dir(model, { depth: null })

    const data = await model.parse(html)

    console.log(data)
})();