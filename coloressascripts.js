// STATE VARIABLES
let starterPalette = ["#a91413",
    "#F40215",
    "#FF5367",
    "#ff4f00",
    "#ff7e00",
    "#ff8c00",
    "#ffa500",
    "#fac809",
    "#ffd700",
    "#ecd540",
    "#fefe33",
    "#fefe33",
    "#faec66",
    "#fff3ad",
    "#cba135",
    "#50771d",
    "#00ba84",
    "#00ff00",
    "#93d207",
    "#32cd32",
    "#90ee90",
    "#85bb65",
    "#b6a767",
    "#228b22",
    "#30d5c8",
    "#59e1eb",
    "#c7d5c7",
    "#00ffff",
    "#a4f4f9",
    "#0bb9dd",
    "#329bdb",
    "#1e90ff",
    "#1f108a",
    "#0047ab",
    "#0000ff",
    "#1c1cf0",
    "#4166f5",
    "#4169e1",
    "#21aefb",
    "#0fc0fc",
    "#00bfff",
    "#77b5fe",
    "#ffaefb",
    "#d584fb",
    "#ff77ff",
    "#fba0e3",
    "#f8def0",
    "#ff33cc",
    "#702a5d",
    "#e101c1",
    "#cb2aae",
    "#ff1493",
    "#fc65a5",
    "#ff69b4",
    "#773733",
    "#672154",
];

function hexToRgb2(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function randomInteger(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
}

function cutHex(h) {
    return (h.charAt(0) == "#") ? h.substring(1, 7) : h;
}

function hexToR(h) {
    return parseInt((cutHex(h)).substring(0, 2), 16);
}

function hexToG(h) {
    return parseInt((cutHex(h)).substring(2, 4), 16);
}

function hexToB(h) {
    return parseInt((cutHex(h)).substring(4, 6), 16);
}

function tohex(n) {
    n = parseInt(n, 10);
    if (isNaN(n)) {
        return "00";
    }
    n = Math.max(0, Math.min(n, 255));
    var finalhex = "0123456789ABCDEF".charAt((n - n % 16) / 16) + "0123456789ABCDEF".charAt(n % 16);
    return finalhex;
}

function rgbtohex(R, G, B) {
    var finalhex = "#" + tohex(R) + tohex(G) + tohex(B);
    return finalhex;
}

function scrollToPageTop() {
    document.body.scrollTop = 0; // For Safari
    document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
}

function RGBToHex(r, g, b) {
    r = r.toString(16);
    g = g.toString(16);
    b = b.toString(16);

    if (r.length == 1)
        r = "0" + r;
    if (g.length == 1)
        g = "0" + g;
    if (b.length == 1)
        b = "0" + b;
    return "#" + r + g + b;
}

// Current color's hex code is stored in an invisible div at the bottom of the page
function setCurrentColor(colorHexCode) {
    //alert(`${colorHexCode} Current color selected`);
    $("#currentcolorstorage").empty();
    $("#currentcolorstorage").text(`${colorHexcode}`);
    //$("#currentcolorindicatorcircle").css("background-color", colorHexCode);
}

function generateVariant(hexColor) {
    let hexVariant = RGBToHex(r, g, b);
    var elm = `<div class="colorbox" onClick="copyToClipboard(${hexVariant})" 
        data-clipboard-text="${hexVariant}"
       style="background:${hexVariant};"> ${hexVariant} </div>`;
    $(elm).appendTo($("#variantscontainer"));
}

function uplimit(number) {
    if (number > 255) {
        return 255;
    } else {
        return number;
    }
}

function downlimit(number) {
    if (number < 0) {
        return 0;
    } else {
        return number;
    }
}

function getvarianthexcode(hexcolorcode, variantamount) {

    let redamount = hexToR(hexcolorcode);
    let greenamount = hexToG(hexcolorcode);
    let blueamount = hexToB(hexcolorcode);
    let redmin = redamount - variantamount;
    let redmax = redamount + variantamount;

    redmax = uplimit(redmax);
    redmin = downlimit(redmin);

    var greenmin = greenamount - variantamount;
    var greenmax = greenamount + variantamount;
    greenmax = uplimit(greenmax);
    greenmin = downlimit(greenmin);

    var bluemin = blueamount - variantamount;
    var bluemax = blueamount + variantamount;
    bluemax = uplimit(bluemax);
    bluemin = downlimit(bluemin);

    var newred = randomInteger(redmin, redmax);
    var newgreen = randomInteger(greenmin, greenmax);
    var newblue = randomInteger(bluemin, bluemax);

    let hexVariant = rgbtohex(newred, newgreen, newblue);
    return hexVariant;
}

function getvariant(hexcolorcode, variantamount) {

    let redamount = hexToR(hexcolorcode);
    let greenamount = hexToG(hexcolorcode);
    let blueamount = hexToB(hexcolorcode);

    // 20 is 8 percent of 255...so the variants are within
    //var variantamount = 20;
    let redmin = redamount - variantamount;
    let redmax = redamount + variantamount;

    redmax = uplimit(redmax);
    redmin = downlimit(redmin);

    var greenmin = greenamount - variantamount;
    var greenmax = greenamount + variantamount;
    greenmax = uplimit(greenmax);
    greenmin = downlimit(greenmin);

    var bluemin = blueamount - variantamount;
    var bluemax = blueamount + variantamount;
    bluemax = uplimit(bluemax);
    bluemin = downlimit(bluemin);

    var newred = randomInteger(redmin, redmax);
    var newgreen = randomInteger(greenmin, greenmax);
    var newblue = randomInteger(bluemin, bluemax);

    let hexVariant = rgbtohex(newred, newgreen, newblue);

    var elm = `<div class="colorbox" onClick="copyToClipboard(${hexVariant})" 
    data-clipboard-text="${hexVariant}"
   style="background:${hexVariant};"> ${hexVariant} </div>`;

    $(elm).appendTo($(".variantscontainer"));
}

function shadeColor(col, amt) {
    col = col.replace(/^#/, '')
    if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
    let [r, g, b] = col.match(/.{2}/g);
    ([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
    r = Math.max(Math.min(255, r), 0).toString(16)
    g = Math.max(Math.min(255, g), 0).toString(16)
    b = Math.max(Math.min(255, b), 0).toString(16)
    const rr = (r.length < 2 ? '0' : '') + r
    const gg = (g.length < 2 ? '0' : '') + g
    const bb = (b.length < 2 ? '0' : '') + b
    return `#${rr}${gg}${bb}`
}

function shadeColorX(color, percent) {
    var R = parseInt(color.substring(1, 3), 16);
    var G = parseInt(color.substring(3, 5), 16);
    var B = parseInt(color.substring(5, 7), 16);
    R = parseInt(R * (100 + percent) / 100);
    G = parseInt(G * (100 + percent) / 100);
    B = parseInt(B * (100 + percent) / 100);
    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;
    var RR = ((R.toString(16).length == 1) ? "0" + R.toString(16) : R.toString(16));
    var GG = ((G.toString(16).length == 1) ? "0" + G.toString(16) : G.toString(16));
    var BB = ((B.toString(16).length == 1) ? "0" + B.toString(16) : B.toString(16));
    return "#" + RR + GG + BB;
}

function rgbToHex(r, g, b) {
    return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
}

function hslToHex(h, s, l) {
    l /= 100;
    const a = s * Math.min(l, 1 - l) / 100;
    const f = n => {
        const k = (n + h / 30) % 12;
        const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
        return Math.round(255 * color).toString(16).padStart(2, '0'); // convert to Hex and prefix "0" if needed
    };
    return `#${f(0)}${f(8)}${f(4)}`;
}

function displayneutrals() {
    let currentInt = 255;
    let endingInt = 0;
    let currentColorInHex;
    for (let i = 0; i < 120; i++) {
        if (currentInt >= 0) {
            currentColorInHex = rgbToHex(currentInt, currentInt, currentInt);
            var elm = `<div class="colorbox" onClick="copyToClipboard(${currentColorInHex})" 
         data-clipboard-text="${currentColorInHex}"
        style="background:${currentColorInHex};"> ${currentColorInHex} </div>`;
            $(elm).appendTo($("#neutralscontainer"));
            currentInt = currentInt - 3;
        }
    }
}

function displaymorecolors() {
    const factor = [-7, -5, -3, 0, 2, 4, 6, 8, 10];
    let currentR = randomInteger(40, 225);
    let currentG = randomInteger(40, 225);
    let currentB = randomInteger(40, 225);
    let randomRFactor = randomInteger(-5, 5);
    let randomGFactor = randomInteger(-5, 5);
    let randomBFactor = randomInteger(-5, 5);
    let endingInt = 0;
    let currentColorInHex;

    // FIRST ITERATION
    for (let i = 0; i < 400; i++) {
        if (randomInteger(0, 10) == 1) {
            let j = 0;
            while (j < 20) {
                currentR = currentR + j;
                currentG = currentG + j;
                currentB = currentB + j;
                currentColorInHex = rgbToHex(currentR, currentG, currentB);
                var elm = `<div class="colorbox" onClick="copyToClipboard(${currentColorInHex})" 
         data-clipboard-text="${currentColorInHex}"
        style="background:${currentColorInHex};"> ${currentColorInHex} </div>`;
                $(elm).appendTo($("#morecolorscontainer"));
                j = j + 3;
            }
        }
        // End of IF conditional to lighten color 
        else {
            currentColorInHex = rgbToHex(currentR, currentG, currentB);
            var elm = `<div class="colorbox" onClick="copyToClipboard(${currentColorInHex})" 
         data-clipboard-text="${currentColorInHex}"
        style="background:${currentColorInHex};"> ${currentColorInHex} </div>`;
            $(elm).appendTo($("#morecolorscontainer"));
            currentR = currentR + randomRFactor;
            currentG = currentG - randomGFactor;
            currentB = currentB + randomBFactor;
        }
        if (currentR <= 0) {
            currentR = 0;
            if (randomInteger(0, 2) == 1) {
                currentR = randomInteger(40, 220);
                randomRFactor = factor[Math.floor(Math.random() * factor.length)];
            }
        }
        if (currentG <= 0) {
            currentG = 0;
            if (randomInteger(0, 2) == 1) {
                currentG = randomInteger(40, 220);
                randomGFactor = factor[Math.floor(Math.random() * factor.length)];
            }
        }
        if (currentB <= 0) {
            currentB = 0;
            if (randomInteger(0, 2) == 1) {
                currentB = randomInteger(40, 220);
                randomBFactor = factor[Math.floor(Math.random() * factor.length)];
            }
        }
        if (currentR >= 255) {
            currentR = 255;
            if (randomInteger(0, 2) == 1) {
                currentR = randomInteger(40, 220);
                randomRFactor = factor[Math.floor(Math.random() * factor.length)];
            }
        }
        if (currentG >= 255) {
            currentG = 255;
            if (randomInteger(0, 2) == 1) {
                currentG = randomInteger(40, 220);
                randomGFactor = factor[Math.floor(Math.random() * factor.length)];
            }
        }
        if (currentB >= 255) {
            currentB = 255;
            if (randomInteger(0, 2) == 1) {
                currentB = randomInteger(40, 220);
                randomBFactor = factor[Math.floor(Math.random() * factor.length)];
            }
        }
    }
}

function createShades(hexColor) {
    $("#shadesmegacontainer").fadeIn();

    $('html, body').animate({
        scrollTop: $("#shadesmegacontainer").offset().top
    }, 1000);


    $(".shadesContainer").empty();
    let currentInt = 180;
    let shadeColor1 = shadeColor(hexColor, currentInt);
    $("#shadesContainer").empty();
    $("#shadeshexlabel").text(hexColor);
    // FIRST SHOW THE ORIGINAL COLOR
    var elm2 = `<div class="colorbox" onClick="copyToClipboard(${hexColor})" 
         data-clipboard-text="${hexColor}"
        style="background:${hexColor};"> ${hexColor} </div>`;
    $(elm2).appendTo($("#shadescontainer"));
    let whitecounter = 0;

    for (let i = 0; i < 140; i++) {
        shadeColor1 = shadeColor(hexColor, currentInt);
        if (shadeColor1 === "#ffffff") {
            whitecounter++;
        }
        if (/^#[0-9A-F]{6}$/i.test(shadeColor1)) {
            var elm = `<div class="colorbox" 
            onClick="copyToClipboard(${shadeColor1})" 
         data-clipboard-text="${shadeColor1}" 
         data-hexcolor="${shadeColor1}" 
        style="background:${shadeColor1};"> ${shadeColor1} </div>`;

            // If the Color ISNT WHite
            if (shadeColor1 !== "#ffffff") {
                $(elm).appendTo($("#shadescontainer"));
            }
            // If the Color is WHITE
            else {
                if (whitecounter <= 1) {
                    $(elm).appendTo($("#shadescontainer"));
                }
            }
        }

        // Allow only one shade box of black to show
        if (shadeColor1 === "#000000") {
            return;
        }
        currentInt = currentInt - 5;
        shadeColor1 = shadeColor(hexColor, currentInt);
    } // End of For loop

    // Highlight the color box of the base color
    $(`[data-hexcolor="${hexColor}"]`).removeClass("colorbox");
    $(`[data-hexcolor="${hexColor}"]`).removeClass("colorbox2");
    $(`[data-hexcolor="${hexColor}"]`).css("background-color", "yellow");
}

function createVariants() {

    let hexColor = $("#shadeshexlabel").text();
    $("#variantsmegacontainer").fadeIn();

    $('html, body').animate({
        scrollTop: $("#variantsmegacontainer").offset().top
    }, 1000);

    $(".variantsContainer").empty();
    let currentInt = 180;
    let shadeColor1 = shadeColor(hexColor, currentInt);
    $("#variantsContainer").empty();
    $("#variantshexlabel").text(hexColor);

    var elm = `<div class="colorbox" onClick="copyToClipboard(${hexColor})" 
        data-clipboard-text="${hexColor}"
       style="background:${hexColor};"> ${hexColor} </div>`;

    $(elm).appendTo($("#variantscontainer"));

    for (let i = 0; i < 39; i++) {

        let variantR = hexToRgb2(hexColor).r + randomInteger(-27, 27);
        let variantG = hexToRgb2(hexColor).g + randomInteger(-27, 27);
        let variantB = hexToRgb2(hexColor).b + randomInteger(-27, 27);

        if (variantR < 0) { variantR = 0; }
        if (variantG < 0) { variantG = 0; }
        if (variantB < 0) { variantB = 0; }
        if (variantR > 255) { variantR = 255; }
        if (variantG > 255) { variantG = 255; }
        if (variantB > 255) { variantB = 255; }

        let newVariant = rgbtohex(variantR, variantG, variantB);

        var elm = `<div class="colorbox" onClick="copyToClipboard(${newVariant})" 
        data-clipboard-text="${newVariant}"
       style="background:${newVariant};"> ${newVariant} </div>`;
        $(elm).appendTo($("#variantscontainer"));
    }
}

function createStarterPalette() {

    let newVariant = starterPalette[0];
    for (let i = 0; i < starterPalette.length; i++) {

        newVariant = starterPalette[i];

        var elm = `<div class="colorbox" onClick="copyToClipboard(${newVariant})" 
        data-clipboard-text="${newVariant}"
       style="background:${newVariant};"> ${newVariant} </div>`;

        $(elm).appendTo($(".startercontainer"));
    }
}


function createstarterpalettevariants() {

    let newVariant = "";

    // Empty the starter palette container
    $(".startercontainer").html("");

    // Iterate through the array, and create a variant of each color
    // and add the color back to the container
    for (let i = 0; i < starterPalette.length; i++) {
        newVariant = getvarianthexcode(starterPalette[i], randomInteger(3, 19));

        var elm = `<div class="colorbox" onClick="copyToClipboard(${newVariant})" 
        data-clipboard-text="${newVariant}"
       style="background:${newVariant};"> ${newVariant} </div>`;

        $(elm).appendTo($(".startercontainer"));
    }
}



/* NOTES, TODOs



Last improved on July 31, 2021
*/