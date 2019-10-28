# Study-group

一个专门用来统计《底层大佬》学习小组完成情况和发布任务的仓库。

## 本周任务

**10月21日--10月27日任务**

* 第一周，暂定600-1000字的文章，可以一篇或者多篇，代码不算，质量为先。

## 如何参与

* 每周的周一联系本周的管理人员，缴纳10元钱的参与基金，完成任务者退回，剩余钱归本周管理人员。

## 如何记录自己的任务历史完成情况

* 在 history 文件下建立自己的文件夹，创建 review.md 文件。
* 使用 markdown 语法 `- []`, `- []` 表示未完成， `- [X]` 表示完成
* 创建 article 文件夹，里面的文件，存放自己写的文章的地址和介绍，怎么写和格式自己组织。
* 具体的创建， 参考 history/hechangju/review.md 文件

## 如何记录本周完成情况

在 current.md 中记录本周完成情况，记录格式同上，后期会采用自动化的方法实现记录

## 开发流程

1. 添加 remote git remote origin https://github.com/Hemuxue/Study-group.git
2. 如果只是修改自己文件夹下的文章连接，或者文章可以直接在master 开发，然后使用 git push origin master.
3. 如果其他人员修改了 自动化代码或者readme，则需要用以下的步骤进行开发。
   1. 在GitHub 中建立 issue，表明需要完成的任务。 https://github.com/Hemuxue/Study-group/issues  。 参考之前的 issue 建立方式，需要设计分配人。
   2. 在代码中，使用 git pull origin master 拉下最新代码。
   3. 使用 git checkout -b  feat-21-XXX     （其中21 为对应的issue 编号）。切换到开发分支。
   4. 开发完毕。 git add . git commit -m 'XXX'   commit 信息请按照如下格式填写。例如： git commit -m 'feat(module: readme): change readme'
   5. git push origin XXX  (XXX 为你当前的开发的分支名)
   6. 到GitHub仓库内建立 pr, pr 具体建立方式，询问 @hechangju 或者百度。
   7. 分配的审核人员进行审核，审核通过后，合并进入master。最后删除当前分支。（不懂的话，操作前询问）
## 如何编写提交信息

* 参与人员维护自己的文章页面。 feat(module: XXXX): XXX
* 管理人员维护完成情况。 feat(module: condition): 2019.10.21 - 2019.10-28   ； 替换时间


