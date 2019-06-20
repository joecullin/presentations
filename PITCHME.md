# Working in Linux

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)
@title[Overview]

@snap[north-west h4-white]
#### Focus of This Talk
@snapend

Useful skills for troubleshooting code.

@ul[spaced text-white](false)
- Thinking in Pipes
- Finding things
- Inspecting and comparing files
- Modifying files
- Fast navigation and task management
@ulend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
### Thinking in Pipes
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

Using fewer commands and a utility script.
```bash
$ find . -type f -name \*.inc | xargs cat | ./util.js
```
@[1](Find all *.inc files, and dump their lines.)
```javascript
#!/usr/local/bin/node
const getInput = () => {
  return new Promise((resolve, reject) => {
    let paths = []; 
    const getStdin = require("get-stdin");
    getStdin().then(input => {
      let lines = input.split("\n");
      let lineRE = /\$cachevalidurl='(.*?)'/;
      lines.forEach(line => {
        const lineMatch = line.match(lineRE);
        if (lineMatch) paths.push(lineMatch[1]);       
      });   
      resolve(paths);
    }); 
  });
};
getInput().then(paths => {
  console.log("paths", paths);
});
```
@[1-7](Read stdin, split into lines.)
@[8-12](Filter the lines we want.)
@[17-19](Further processing ...)


---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Building Blocks
@snapend

@snap[west span-100]
@ul[text-white]
- Essential grammar is small: stdin, stdout, files, lines.
- Start with custom scripts on your most-used systems.
- **Benefits of a larger vocabulary:**
- For when you don't have permissions (or time) to set up your usual commands.
- To re-use others' work: confidently parse and adapt suggestions from stack overflow and the internet. Example: https://www.google.com/search?q=linux+count+and+remove+matching+lines+in+directory
@ulend
@snapend

Note:
- Using standard building blocks also make it easier to get help.
- There's a giant community that is eager to troubleshoot your commands.
- Harder to get the same support for lengthy custom code.
- First google result: sed, custom utility, find (recursive) with xargs.

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Finding Things
@snapend

@snap[west span-70]
@ul[spaced text-white]
- *With a little imagination...*
- And **GitPitch Markdown**
@ulend
@snapend


```$ ls -halt
total 120
drwxr-xr-x   7 jcullin  2044526916   442B Jun 19 21:58 .git
-rw-r--r--   1 jcullin  2044526916    16K Jun 19 21:56 .PITCHME.md.swp
drwxr-xr-x   6 jcullin  2044526916   442B Jun 19 21:55 .
-rw-r--r--   1 jcullin  2044526916   4.6K Jun 19 21:55 PITCHME.md
drwxr-xr-x   4 jcullin  2044526916   238B Jun 19 11:57 code
```

@snap[east span-20]
@img[shadow](assets/img/find_cat2.jpg)
@snapend


---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Resources
@snapend

@snap[west span-55]
@ul[spaced text-white](false)
- Join *#learning-linux*
- My utility scripts: https://github.com/joecullin/joecullin-toolbox
- vi exercises: http://www2.geog.ucl.ac.uk/~plewis/teaching/unix/vimtutor
@ulend
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
