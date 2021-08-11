// STATE VARIABLES
let starterPalette = ["#a91413",
    "#8B0000",
    "#FF0000",
    "#FF0033",
    "#FF5367",
    "#ff4f00",
    "#ff7e00",
    "#ff8c00",
    "#ffa500",
    "#ff9955",
    "#fac809",
    "#ffd700",
    "#ecd540",
    "#cba135",
    "#fefe33",
    "#ffff00",
    "#FFFFE0",
    "#faec66",
    "#fff3ad",
    "#D2B48C",
    "#F5F5DC",
    "#FFFFF0",
    "#50771d",
    "#00ba84",
    "#00ff00",
    "#93d207",
    "#32cd32",
    "#90ee90",
    "#85bb65",
    "#b6a767",
    "#228b22",
    "#2F4F2F",
    "#90EE90",
    "#30d5c8",
    "#63cec4",
    "#59e1eb",
    "#c7d5c7",
    "#00ffff",
    "#a4f4f9",
    "#0bb9dd",
    "#329bdb",
    "#1e90ff",
    "#000080",
    "#1f108a",
    "#0047ab",
    "#0000ff",
    "#1c1cf0",
    "#4166f5",
    "#4169e1",
    "#21aefb",
    "#ADD8E6",
    "#0fc0fc",
    "#00bfff",
    "#77b5fe",
    "#876edf",
    "#ffaefb",
    "#d584fb",
    "#ff77ff",
    "#ff00ff",
    "#fba0e3",
    "#f8def0",
    "#ff33cc",
    "#e101c1",
    "#db03a9",
    "#800080",
    "#702a5d",
    "#cb2aae",
    "#ff1493",
    "#fc65a5",
    "#ffc0cb",
    "#ff69b4",

    "#773733",
    "#672154",
    "#000000",
    "#808080",
    "#C0C0C0",
];

function hexToRgb2(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function HEXtoHSL(hex) {
    hex = hex.replace(/#/g, '');
    if (hex.length === 3) {
        hex = hex.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }
    var result = /^([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})[\da-z]{0,0}$/i.exec(hex);
    if (!result) {
        return null;
    }
    var r = parseInt(result[1], 16);
    var g = parseInt(result[2], 16);
    var b = parseInt(result[3], 16);
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b),
        min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;
    if (max == min) {
        h = s = 0;
    } else {
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;
            case g:
                h = (b - r) / d + 2;
                break;
            case b:
                h = (r - g) / d + 4;
                break;
        }
        h /= 6;
    }
    s = s * 100;
    s = Math.round(s);
    l = l * 100;
    l = Math.round(l);
    h = Math.round(360 * h);

    return {
        h: h,
        s: s,
        l: l
    };
}

function hexToCMYK(hex) {
    var computedC = 0;
    var computedM = 0;
    var computedY = 0;
    var computedK = 0;

    hex = (hex.charAt(0) == "#") ? hex.substring(1, 7) : hex;

    if (hex.length != 6) {
        alert('Invalid length of the input hex value!');
        return;
    }
    if (/[0-9a-f]{6}/i.test(hex) != true) {
        alert('Invalid digits in the input hex value!');
        return;
    }

    var r = parseInt(hex.substring(0, 2), 16);
    var g = parseInt(hex.substring(2, 4), 16);
    var b = parseInt(hex.substring(4, 6), 16);

    // BLACK
    if (r == 0 && g == 0 && b == 0) {
        computedK = 1;
        return [0, 0, 0, 1];
    }

    computedC = 1 - (r / 255);
    computedM = 1 - (g / 255);
    computedY = 1 - (b / 255);

    var minCMY = Math.min(computedC, Math.min(computedM, computedY));

    computedC = (computedC - minCMY) / (1 - minCMY);
    computedM = (computedM - minCMY) / (1 - minCMY);
    computedY = (computedY - minCMY) / (1 - minCMY);
    computedK = minCMY;

    return [computedC, computedM, computedY, computedK];
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

// Zindagi na mileage dubara

function percievedBrightness(r, g, b) {
    //alert(Math.sqrt(0.299 * Math.pow(r, 2) + 0.587 * Math.pow(g, 2) + 0.114 * Math.pow(b, 2)));
    return parseInt(Math.sqrt(0.299 * Math.pow(r, 2) + 0.587 * Math.pow(g, 2) + 0.114 * Math.pow(b, 2)));
}

// TODO CURRENT
function getColorBox(hexColor) {
    return `<div class="colorbox" onClick="copyToClipboard(${hexColor})" 
        data-clipboard-text="${hexColor}"
       style="background:${hexColor};"> ${hexColor} </div>`;

}


/*
IDs of relevant DOM elements to change when a new color is selected
currentcolorheaderdisplay - big text at top of the panel. Only hex code placed here.
*/
function setCurrentColor(colorHexCode) {

    let hexCodeString = String(colorHexCode);

    // Empty Current Containers of possible previous value
    $('#currentcolorstorage').empty();
    $('#currentcolorstorage').text(hexCodeString);

    $('#currentcolorstorage').empty();
    $('#currentcolorheaderdisplay').text(hexCodeString);
    $('#currentcolorheaderdisplay').css("border-top-color", hexCodeString);

    let rValue = hexToR(colorHexCode);
    let gValue = hexToG(colorHexCode);
    let bValue = hexToB(colorHexCode);
    let cmykArray = hexToCMYK(colorHexCode);

    $("#currentcolorindicatorcircle").css("background-color", hexCodeString);

    let rgbCompositeString = `rgb(${rValue},${gValue},${bValue})`;
    $('#currentcolorboxrgbvalue').empty();
    $('#currentcolorboxrgbvalue').text(rgbCompositeString);

    let hslObject = HEXtoHSL(hexCodeString)
    $('#currentcolorboxhslvalue').empty();
    $('#currentcolorboxhslvalue').
        html(`hsl(${hslObject.h}, ${hslObject.s}%, ${hslObject.l}%)`);

    $('#currentcolorboxcmykvalue').empty();
    $('#currentcolorboxcmykvalue').
        text(`${cmykArray[0].toFixed(4)}, ${cmykArray[1].toFixed(4)}, ${cmykArray[2].toFixed(4)}, ${cmykArray[3].toFixed(4)}`);

    $('#currentcolorluminancevalue').empty();
    currentcolorluminancepercentvalue
    $('#currentcolorluminancepercentvalue').text(String(parseInt(percievedBrightness(rValue, gValue, bValue) / 255 * 100)) + "%");
    $('#currentcolorluminancevalue').text(String(percievedBrightness(rValue, gValue, bValue)) + " / 255");
}

function toggleCurrentColorBox() {

    if ($('#currentColorVisibile').is(':visible')) {
        $('#currentColorToggle').text("SHOW");
        $('#currentColorVisibile').hide("slow");
    }
    if ($('#currentColorVisibile').is(':hidden')) {
        $('#currentColorToggle').text("HIDE");
        $('#currentColorVisibile').show("slow");
    }
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
    let currentR = randomInteger(0, 255);
    let currentG = randomInteger(0, 225);
    let currentB = randomInteger(0, 255);
    let randomRFactor = randomInteger(-5, 5);
    let randomGFactor = randomInteger(-5, 5);
    let randomBFactor = randomInteger(-5, 5);
    let endingInt = 0;
    let currentColorInHex;

    // FIRST ITERATION
    for (let i = 0; i < 100; i++) {

        currentColorInHex = rgbToHex(
            randomInteger(0, 255),
            randomInteger(0, 255),
            randomInteger(0, 255));

        let j = 0;

        // Decide if we want to lighten or darken the color in the while loop
        let lightenordarken = randomInteger(0, 1);

        while (j < 8) {

            var elm = `<div class="colorbox" onClick="copyToClipboard(${currentColorInHex})" 
         data-clipboard-text="${currentColorInHex}"
        style="background:${currentColorInHex};"> ${currentColorInHex} </div>`;

            $(elm).appendTo($("#morecolorscontainer"));
            j++;

            if (lightenordarken == 0) {
                // This brightens the color
                currentColorInHex = shadeColor(currentColorInHex, randomInteger(14, 21));
            }
            else {
                // This darkens the color
                currentColorInHex = shadeColor(currentColorInHex, randomInteger(-20, -14));
            }

            if (currentColorInHex == "#ffffff" || currentColorInHex == "#000000") {
                break;
            }

            if (currentR <= 0) {
                currentR = 0;
            }
            if (currentG <= 0) {
                currentG = 0;
            }
            if (currentB <= 0) {
                currentB = 0;
            }
            if (currentR >= 255) {
                currentR = 255;
            }
            if (currentG >= 255) {
                currentG = 255;
            }
            if (currentB >= 255) {
                currentB = 255;
            }
        } // End of While loop
    } // End of for loop
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

        let variantR = hexToRgb2(hexColor).r + randomInteger(-32, 32);
        let variantG = hexToRgb2(hexColor).g + randomInteger(-32, 32);
        let variantB = hexToRgb2(hexColor).b + randomInteger(-32, 32);

        if (variantR < 0) { variantR = 0; }
        if (variantG < 0) { variantG = 0; }
        if (variantB < 0) { variantB = 0; }
        if (variantR > 255) { variantR = 255; }
        if (variantG > 255) { variantG = 255; }
        if (variantB > 255) { variantB = 255; }

        let newVariant = rgbtohex(variantR, variantG, variantB);

        //     var elm = `<div class="colorbox" onClick="copyToClipboard(${newVariant})" 
        //     data-clipboard-text="${newVariant}"
        //    style="background:${newVariant};"> ${newVariant} </div>`;

        let elm = getColorBox(newVariant);
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


function goToGrays(){
    $('html, body').animate({
        scrollTop: $("#grays").offset().top
    }, 700);

}

$(document).ready(function () {
    // HIDE the CURRENT COLOR PANEL, since by default there is no current color when page loads
    $('#currentColorVisibile').toggle("slow");
});


/* NOTES, TODOs




*/