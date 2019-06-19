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
    let seenSteps = {};
    let allSteps = {};
    Object.entries(steps).forEach( ([step,childSteps]) => {
        allSteps[step] = {};
        seenSteps[step] = 1;
        childSteps.forEach( child => {
            allSteps[child] = {};
            seenSteps[child] = 1;
        });
    });
    Object.keys(seenSteps).forEach( (step) => {
        let childSteps = steps[step];
        if (childSteps !== undefined){
            childSteps.sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0) );
            allSteps[step].child = childSteps;
        }
    });
    Object.keys(seenSteps).forEach( (step) => {
        let parents = [];
        Object.entries(allSteps).forEach( ([possibleParent, childSteps]) => {
            if (childSteps.child !== undefined && childSteps.child.filter( childStep => childStep === step ).length){
                parents.push(possibleParent);
            }
        });
        allSteps[step].parents = parents;
    });
    // console.log(allSteps);
    let done = false;
    let path = [];
    let alreadyTaken = {};
    let inProgress = {};
    let completed = {};
    let candidates = {};
    let workerTasks = {1: '', 2: '', 3: '', 4: '', 5: ''};
    let workerTimes = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0};
    let clock = -1;

    Object.keys(allSteps).filter( step => !allSteps[step].parents.length ).forEach( step => { candidates[step] = 1 });
    while (!done){
        console.log(clock, workerTimes, workerTasks);
        Object.entries(workerTimes).forEach( ([worker, timeLeft]) => {
            console.log(`worker ${worker}`);
            if (timeLeft > 0){
                workerTimes[worker] = --timeLeft;
            }
            if (timeLeft === 0){
                if (workerTasks[worker] !== ''){
                    console.log(`deleting task for worker ${worker}`, workerTasks[worker]);
                    completed[ workerTasks[worker] ] = 1;
                    delete inProgress[workerTasks[worker]];
                    workerTasks[worker] = '';
                }

                candidates = {};
                Object.keys(allSteps).forEach( step => {
                    if (
                        !alreadyTaken[step]
                        && !allSteps[step].parents.filter( check => !alreadyTaken[check] ).length  // all parents taken
                        && !allSteps[step].parents.filter( check => !completed[check] ).length     // all parents completed
                        ){
                        console.log(`adding ${step} to candidates list`, inProgress);
                        candidates[step] = 1;
                    }
                });
                let candidatesSorted = Object.keys(candidates).sort( (a,b) => a.charCodeAt(0) - b.charCodeAt(0) );
                console.log('candidates', candidatesSorted.join(''));
                if (candidatesSorted.length){
                    let takeStep = candidatesSorted[0];
                    delete candidates[takeStep];
                    path.push(takeStep);
                    alreadyTaken[takeStep] = 1;
                    inProgress[takeStep] = 1;
                    workerTasks[worker] = takeStep;
                    workerTimes[worker] = takeStep.charCodeAt()-4;
                    console.log('path', path.join(''));
                }                        
            }
        });
        done = !Object.keys(candidates).length && !Object.keys(workerTimes).filter( worker => workerTimes[worker] ).length;
        if (!done)
            clock++;
    }
    console.log(path.length);
    console.log(path.join(''));
    console.log(clock);
});
