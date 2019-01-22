const fs = require('fs')
const {
    convertHtmlToDelta,
    convertDeltaToHtml
} = require('node-quill-converter')

const write = (path, content) => {
    fs.writeFile(path, content, function(err) {
        if (err) {
            return console.log(err)
        }
    })
}

let htmlDomStrings = [
    "line one<div>line two</div><div><br></div><div><ul><li>list item one</li><li>list item two <br></li></ul><div><br></div></div><div><ol><li>another list item</li></ol><div><br></div></div><div><table><tbody><tr><td>table item one </td><td> table item two</td></tr></tbody></table></div><div><br></div>",
    "<p>test</p>"
]

let deltas = htmlDomStrings.map( htmlDomString => convertHtmlToDelta(htmlDomString))
write("deltas.json", JSON.stringify(deltas))

let html = deltas.reduce((content, delta) => content += "\n-----------------------------\n" + convertDeltaToHtml(delta), "")
write("output.html", html)

console.log("DONE")