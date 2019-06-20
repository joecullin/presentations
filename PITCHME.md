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
- Multiple steps and temp files are helpful too.
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
#### Finding Things: ls
@snapend

```bash
$ ls -halt | less
total 120
drwxr-xr-x   7 jcullin  2044526916   442B Jun 19 21:58 .git
-rw-r--r--   1 jcullin  2044526916    16K Jun 19 21:56 .PITCHME.md.swp
drwxr-xr-x   6 jcullin  2044526916   442B Jun 19 21:55 .
-rw-r--r--   1 jcullin  2044526916   4.6K Jun 19 21:55 PITCHME.md
drwxr-xr-x   4 jcullin  2044526916   238B Jun 19 11:57 code
```

@ul[spaced text-white]
- -h *human*-readable file sizes
- -a show *all* files, including hiden "dot" files
- -l *long* listing: permissions, size, owner, mod time
- -t sort by most-recently modified *time*
- pipe to less, in case it's a large dir
@ulend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Finding Things: find 
@snapend

@snap[north-east span-20]
@img[shadow](assets/img/find_cat2.jpg)
@snapend

@ul[spaced text-white]
- -type - f or d (file or dir)
- -name - filename pattern
- -mtime - last-modified within X days
@ulend

```bash
$ find . -type f -name \*.md -mtime -7 | xargs wc -l
     188 ./PITCHME.md
     329 ./README.md
      52 ./SAVE.md
      55 ./code/node_modules/get-stdin/readme.md
     624 total
```
@[1](Find all markdown files modified this week.)
@[2-6](Call wc -l on the resulting list, to get line counts.)

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Inspecting files
@snapend

@ul[spaced text-white]
- cat, head, tail, more - older, simpler
- less - newer replacement for all of above
 - keyboard navigation (same as vi)
 - search (same as vi)
 - show line numbers
 - efficient for giant files
@ulend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Comparing files: diff
@snapend

```bash
$ diff -u -w pre-dorothy-generate-sitemaps.php generate-sitemaps.php
```
@[1](-u - universal format)
@[1](-w - ignore whitespace-only changes)
@[1](old file *minuses* first, new file *pluses* second)

```diff
--- pre-dorothy-generate-sitemaps.php	2019-06-18 19:41:08.162182171 -0400
+++ generate-sitemaps.php	2019-06-18 19:49:28.939170934 -0400
@@ -7,14 +7,43 @@
 $outdir	= "/www/tnetadmin/metaedit/generate-newer-sitemaps/data";
-$pnn_root = "https://news.thomasnet.com";
 
 /** featured content **/  
 $sitemapType = "Featured Content";
-$featuredContent = $sitecontent->get("news.thomasnet.com/_sitemap_data/featured_stories");
+$featuredContent = $sitecontent->get("www.thomasnet.com/_sitemap_data/featured_stories");
 $totalUrls = sizeof($featuredContent);
 if ($totalUrls == 0){ error_exit("No featured content found!"); }
 $filenumbers = ceil($totalUrls/$max_urls);
@@ -25,7 +54,7 @@
     $fileName = "featured_$filenum.xml";
-    $outfile	= "$outdir/news/$fileName";
+    $outfile	= "$outdir/www/$fileName";
```
@[6](removed line - only exists in old)
@[10-11](changed line)
@[17-18](changed line)

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Modifying Files: vi
@snapend

Learn vi
@ul[spaced text-white]
- It's installed everywhere, and it's not hard to learn the basics.
- For a week, spend 5 minutes a day doing exercises (link on last slide).
- Then pick a small regular task to do in vi, e.g. taking daily scrum notes.
- Bigger changes? Use `rsync` to work locally in vscode or another editor.
@ulend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Modifying Files: working without version control
@snapend

```bash
$ diff -u -w index.php.save index.php
$ fgrep '//JOETEMP' index.php
```

@ul[spaced text-white]
- Back up every file you touch, or the whole dir.
- Flag every "temp" debug change with a comment.
- When you're done:
 - Search all files for lingering temp debug flags.
 - Diff against backup. (diff -r for whole dir.)
 - Delete your backup files. (Archive in your home dir if you're afraid to lose them.)
@ulend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Navigating: shortcuts
@snapend

Changing directories:
```bash
$ cd ~/site/tnet
$ pushd ~/logs
$ dirs
~/logs ~/site/tnet
$ popd
$ pwd
~/site/tnet
```
@[1](Everyday use: save some typing.)
@[1](Exploring a server: breadcrumb trail of where you've been.)
@[2](Instead of cd, push new dir onto stack)
@[3-4](Inspect your current stack of dirs)
@[5](Pop a directory off the stack)

Editing commands:
```plaintext
ctrl-a - beginning of line    ctrl-e - end of line
ctrl-k - cut                  ctrl-y - paste
ctrl-n - next line            ctrl-p - previous line
ctrl-c - cancel
```
@[8-11](Faster editing. Normal OS controls e.g. scroll, copy, paste usually work too.)

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Navigating: job control
@snapend

```bash
$ jobs
[1]+  Stopped                 vi PITCHME.md
[2]   Stopped                 vi PITCHME.yaml
[3]-  Stopped                 vv
```
Switch between multiple jobs in a single shell.
- ctrl-z to suspend a job
- `fg` to resume the last job
- `jobs` to list jobs
- `fg 3` to resume job number 3
- Alternative approaches: *screen* and *tmux*

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Navigating: history
@snapend

```bash
$ history | tail -3
 2062  fg
 2063  git commit -am "more..." && git push
 2064  history | tail
$ !g
git commit -am "more..." && git push
$ ls README.md 
README.md
$ file !$
file README.md 
README.md: ASCII text
```
@[1-4](Pipe history to `tail` - view last 3 commands.)
@[5-6](Re-run the last command starting with "g")
@[7-8](Run a command with one arg.)
@[9-11](Use `!$` to re-use the previous command's last arg.)

@ul[spaced text-white](false)
- `history` - show your command history
- `!!` - re-run previous command
- `!$`, `!^`, `!*`, `!!:3` - parts of previous command
- Be cautious with `!` on prod or with sudo.
@ulend

---?color=linear-gradient(270deg, #A4ACB3 80%, #03405f 20%)

@snap[north-west h4-white]
#### Resources
@snapend

@ul[spaced text-white](false)
- Join *#learning-linux*
- My utility scripts: https://github.com/joecullin/joecullin-toolbox
- Start your own utility library: `~/bin` is probably already in your path, from `~/.bash_profile`.
- vi exercises: http://www2.geog.ucl.ac.uk/~plewis/teaching/unix/vimtutor
- Recommended commands to master: ls, less, vi, diff, history, rsync, find, cat, ssh, pbcopy/pbpaste (mac only)
@ulend

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
