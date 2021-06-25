import * as shell from "shelljs";

shell.cp("-R", "src/public/js/lib", "dist/public/js/");
shell.cp("-R", "src/public/fonts", "dist/public/");
shell.cp("-R", "src/public/images", "dist/public/");
shell.cp("-R", "src/public/assets", "dist/public/");
shell.cp("-R", "src/public/wp-content", "dist/public/");
shell.cp("-R", "src/public/wp-includes", "dist/public/");
shell.cp("-R", "src/public/main.d810cf0ae7f39f28f336.css", "dist/public/");
shell.cp("-R", "src/public/main.style.d810cf0ae7f2.css", "dist/public/");



