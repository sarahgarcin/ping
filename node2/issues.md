## Trucs qui Bug ou qu'il reste à faire

###Vendredi 9 mai 2014

####BUGS

*résolu 11/05/14* 
- Bug sur les regex, faire en sorte qu'elle ne soit prise que si le mot est tout seul, et non dans un mot. 
(exemple si j'écris "prendre", le pr se transforme en "pour" pour donne "pourendre")

*résolu 12/05/14* 
[Avec la méthode "users.splice(i, 1);"]
- Quand un user ferme sa fenêtre, il ne se déconnecte pas vraiment et reste dans la liste des users connectés. 

*résolu - 12/05/14* 
[var textArea = $('#visu'); textArea.scrollTop(textArea[0].scrollHeight - textArea.height());]
- Le pad "visualisateur" ne suit pas le texte. 

- [12/05/14] Pour l'instant, dans le visualisateur, la "ligne de temps" (|) n'apparait que lorsqu'on fait un keyup ou keydown.

####TO DO

- Pad Perso 
	- [13/05/14] Faire un WYSIWYG (avec les fonctionnalités établies: bold, souligné etc.)
	- [13/05/14] Automatiser les Regex -> système qui permet de les ajouter

- Visualisateurs

	(1)- [12/05/14] Mettre plusieurs visualisateurs (à ce jour, on ne voit qu'un seul user dans le visu - 12/05/14)


- Faire la rivière

	*fait - 13/05/14* 
	- Insérer des images depuis un ordinateur

	- [13/05/14] Insérer des images depuis internet

	- [13/05/14] Insérer les url automatiquement depuis le pad. 


(2)- Faire la timeline -> timecode
	
	- [13/05/14] Timecode sur les lignes

	- [13/05/14] Timecode sur les images 

	- [13/05/14] Lier les différents pad par les timecodes
