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
$ python -mjson.tool tiu_proof_20190619.json \
| fgrep '"url"' \
| fgrep '/featured/' \
| sort \
| uniq \
| cut '-d"' -f4 \
| perl -p -e 's{(.*)}{curl -uTester:tester -v "$1" > /dev/null}'
curl -uTester:tester -v "https://news.thomasnet.com/featured/going-green-how-sustainable-manufacturing-practices-help-the-environment-and-increase-your-revenue/" > /dev/null
curl -uTester:tester -v "https://news.thomasnet.com/featured/how-ab-inbev-global-breweries-incorporate-sustainable-brewing-methods/" > /dev/null
curl -uTester:tester -v "https://news.thomasnet.com/featured/johns-manville-to-add-new-production-line/" > /dev/null
curl -uTester:tester -v "https://news.thomasnet.com/featured/rpm-international-acquires-foam-tape-maker/" > /dev/null
curl -uTester:tester -v "https://news.thomasnet.com/featured/world-s-fastest-lawnmower-could-rival-ferrari/" > /dev/null 
```
@[1](use python to parse (pretty-print and validate) json)
@[2](filter to find all lines containing "url")
@[3](filter to find all urls containing "/featured/")
@[4-5](remove duplicates with sort+uniq)
@[6](split on double quote, and take the 4th column)
@[7](insert that url into a template curl command)
@[8-12](result)


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
