# Working in Linux

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Slide One
@snapend

@snap[west span-55]
@ul[spaced text-white]
- You will be amazed
- What you can achieve
- *With a little imagination...*
- And **GitPitch Markdown**
@ulend
@snapend

@snap[east span-45]
@img[shadow](assets/img/conference.png)
@snapend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
### Pipelines
@snapend

Big ugly command
![big command](assets/img/big_command3.jpg)

Steps:
```bash
$ find . -type f -name \*.inc \
| xargs fgrep '$cachevalidurl' \
| cut "-d'" -f2 \
| perl -p -e 's{^/(.*)}{news.thomasnet.com/$1 to www.thomasnet.com/insights/$1}' \
| sort \
| uniq
news.thomasnet.com/machining/2013/02/20/techno-offers-educational-cnc-package to www.thomasnet.com/insights/machining/2013/02/20/techno-offers-educational-cnc-package
news.thomasnet.com/machining/2013/02/22/bobcad-cam-unveils-grant-program-for-small-business-assistance to www.thomasnet.com/insights/machining/2013/02/22/bobcad-cam-unveils-grant-program-for-small-business-assistance
news.thomasnet.com/machining/2013/02/22/how-does-3-d-printing-impact-conventional-manufacturing to www.thomasnet.com/insights/machining/2013/02/22/how-does-3-d-printing-impact-conventional-manufacturing
news.thomasnet.com/procurement/2014/05/22/innovative-suppliers-accept-procurement-challenge to www.thomasnet.com/insights/procurement/2014/05/22/innovative-suppliers-accept-procurement-challenge
```
@[1](Find all files beneath "." matching *.inc.)
@[2](Search each of those files for lines containing $cachevalidurl.)
@[3](Split on single quote, and take the 2nd column.)
@[4](Insert the resulting value into a template twice.)
@[5-6](Remove duplicates with sort+uniq.)
@[7-10](Result)

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)
@title[Same thing, using utility script]

@snap[north-west h4-white]
### Same thing, done partly in code
@snapend

Same thing, using fewer commands and a utility script.
```bash
$ find journal_data -type f -name \*.inc | xargs fgrep '$cachevalidurl' | node .util.js
```
@[1](Find all files beneath "." matching *.inc.)
@[2](Search each of those files for lines containing $cachevalidurl.)
```javascript
#!/usr/local/bin/node
const getInput = () => {
    return new Promise( (resolve, reject) => {
        let steps = {};
        const getStdin = require('get-stdin');
        getStdin().then(input => {
            let lines = input.split("\n");
            let lineRE = /^Step ([A-Z]) must be finished before step ([A-Z]) can begin./;
            lines.forEach( (line) => {
                let lineMatch = line.match(lineRE);
                let step1 = lineMatch[1], step2 = lineMatch[2];
                if (steps[step1] === undefined){
                    steps[step1] = [];
                }
                steps[step1].push(step2);
            });
            resolve(steps);
        });
    });
};

getInput()
.then( (steps) => {
};
```


@[3](Split on single quote, and take the 2nd column.)
@[4](Insert the resulting value into a template twice.)
@[5-6](Remove duplicates with sort+uniq.)
@[7-10](Result)





---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Slide three!
@snapend

@snap[west span-55]
@ul[spaced text-white]
- You will be amazed
- What you can achieve
- *With a little imagination...*
- And **GitPitch Markdown**
@ulend
@snapend

@snap[east span-45]
@img[shadow](assets/img/conference.png)
@snapend

---?image=assets/img/slide_background.jpg
@title[Conclusion]

@transition[none]

@snap[north-west span-50 h2-black]
## Factory Picture
@snapend

@snap[west span-55]
@ul[spaced text-white](false)
- More tips to share?
- Questions?
@ulend
@snapend

@snap[south span-100 text-06]
[Fork this presentation at https://github.com/joecullin/linux-slides @fa[external-link]](https://github.com/joecullin/linux-slides)
@snapend
