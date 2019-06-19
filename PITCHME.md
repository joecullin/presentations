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
```
@[1](find all files beneath "." matching *.inc)
@[2](search each of those files for lines containing `$cachevalidurl`)


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
