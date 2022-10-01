# see.next
> ***see.next*** is the Laravel+NextJS+TailwindCSS project which I use to start to learn NextJS and hoping to replace my personal blog with nextjs in the future


## last update

---
## date 1 Oct 2022
just commit the source code to githup

---

## index page 
[index_page]:https://archive.org/download/arch_linux_myconfig_24-aug-2022_edit/see-next_001_index.png

![index_page]


## Login page
[login_page]:https://archive.org/download/arch_linux_myconfig_24-aug-2022_edit/see-next_002_login-page.png
![login_page]

## Register page
[register_page]:https://archive.org/download/arch_linux_myconfig_24-aug-2022_edit/see-next_003_register-page.png

![register_page]

## Admin page
[admin_page]:https://archive.org/download/arch_linux_myconfig_24-aug-2022_edit/see-next_004_admin-page.png

![admin_page]

## Member page
[member_page]:https://archive.org/download/arch_linux_myconfig_24-aug-2022_edit/see-next_005_member-page.png

![member_page]


# how to use this source code

by clone this repo into your folder in my case i will do it on the home folder 
`cd ~/`
`git clone https://github.com/farookphuket/see.nextjs.git`

now the source code is copy into my home folder so open it 
`cd ~/see.nextjs`

in the folder `see.nextjs` let edit the file `.env.EXAMPLE` by change it name to `.env` then edit the line below

```
APP_URL=http://localhost:8000
FRONTEND_URL=http://localhost:3000
SESSION_DOMAIN=.localhost


DB_CONNECTION=sqlite

# make sure you have replace the below name to your name
DB_DATABASE=/home/farook/see.nextjs/DB/DB.sqlite

```

you may realize that there is no folder call `vendor` represent here that because the vendor folder is too big to upload to git it will take too much time so that's why I remove it , after you edit the line above in .env file then run `composer update` to get the folder `vendor` back 

now if you run `php artisan serve` open the web browser at `http://localhost:8000` you should get the laravel version

the next step is to connect `nextJS` frontend

`cd nextjs` now when you in this folder you will realize that 2 folders has missing `node_modules` and `.next` this 2 folders are important but to push to githup it take too much time so I have to delete it first

now let edit file `.env.local.EXAMPLE` to `.env.local` then edit the below line to your info

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_FRONTEND_ORIGIN=http://localhost:3000

NEXT_PUBLIC_APP_TITLE="see southern"
NEXT_PUBLIC_MY_WEBSITE="see-southern"

NEXT_PUBLIC_MY_PHONE_NUMBER="+66 95 954 3920,+66 81 397 4489"
NEXT_PUBLIC_MY_EMAIL="firefrook@gmail.com"


```

now run `npm install && npm run dev` open the web browser at `http://localhost:3000` you should see the index page. 


so let go hacking!!
