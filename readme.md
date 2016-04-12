This repo looks to illustrate a problem with puer used as middleware.

## Expected behavior

Upon calling `server.close()` the server should be closed and the program should exit due to no more running tasks.

## Observed behavior

Program keeps running instead.

# Finding the problem

Commenting out the use of `puer` as middleware will solve the issue. Therefore it should be responsible for this behavior. `process._getActiveHandles()` allows us to look at everthing that might keep the program alive. A print of this command after closing the server can be found in this [gist](https://gist.github.com/HoverBaum/a09316e554fd66add90d7f2ce86d8af0) which looks at a case with and one without using puer.

## Suspects

Using above approach I found that there is a 10 seconds long timer ruinning as well as a file watcher for each file in the folder to be watched.

These are the only things introduced by puer.

## Suggested solution

Maybe puer can expose a function to stop all it's file watchers and timers it might create.

## Potential problems

The timer running might be created by the sockets or a submodule used by puer.

# Why I do it this way

I am looking to build a module that can run and shut down a server which uses puer to introduce more complex routes to it. I also want to be able to test my implemented logic. For this it is needed to programatically create and shut down the server. The project I am working on is [puerF](https://github.com/HoverBaum/puerF)
