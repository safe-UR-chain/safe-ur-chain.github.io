---
layout: page
author: Adrian Singer
permalink: /demo/
---

<h1 class="page-title">Hinweise zur Nutzung und Gestaltung</h1>

##### Jekll auf GitHub...

Diese statische Webseite wird auf [GitHub Pages](https://pages.github.com/) kostenfrei gehostet. Serverseitig verarbeitet [Jekyll](https://jekyllrb.com/) die Inhalte um eine "Blog-aware" Webseite zu generieren.

**Zur Mitwirkung** kann man direkt die Inhalte auf GitHub aktualisieren, hat jedoch bis zum Deployment einen Zeitversatz von einigen Sekunden.
> Daher empfiehlt es sich das Repository auszuchecken und lokal zu bearbeiten. Für eine Live-Vorschau muss **Jekyll** lokal installiert sein.
> Eine Anleitung für Linux und Windows findet man [hier](https://jekyllrb.com/docs/installation/).
> Man sollte einen Texteditor einsetzen, der u.a. Markdown-Unterstützung bietet. [VS Code](https://code.visualstudio.com/) ist ein guter und kostenfreier Vertreter.

##### ...mit Markdown, Liquid und HTML...

**[Markdown](https://de.wikipedia.org/wiki/Markdown)** bietet eine stark vereinfachte Syntax ggü. Html und wird von **Jekyll** automatisch in eine statische Webseite übersetzt.
Ein **Cheatsheet für Markdown** findet man u.a. [hier](https://github.com/adam-p/markdown-here/wiki/Markdown-Cheatsheet).

Bei **[Liquid](https://jekyllrb.com/docs/liquid/)** handelt es sich um Template-Befehle, die von Jekyll interpretiert und für das Generieren von HTML genutzt werden.
Die Befehle werden in doppelte geschweifte Klammern geschrieben, um beispielsweise Seiteninformationen auszuwerten.
Den Autor dieser Seite **{{ page.author }}** erhält man durch den Befehl `{{"{{ page.author "}}}}`. Solche Attribute stehen meist im Header der Markdown-Dateien, wie weiter unten beschrieben.

Bilder lassen z.B. sich wie folgt sehr einfach mit relativer oder absoluter Pfadangabe einfügen: `![alt Text](path/to/file "Titel")`, wie hier geschehen:

![alt text]({{ '/assets/img/safe-UR-chain-demo.png' | relative_url }} "Markdown Image Titel")

**[HTML](https://www.w3schools.com/)** kann bei Bedarf auch mit Markdown gemischt werden, z.B. um Bilder zu skalieren oder zu verändern.

<img alt="alt html text" style="filter: grayscale(100%);" width="150" src="{{ "/assets/img/safe-UR-chain-demo.png" | relative_url }}" />

##### ...neue Artikel erstellen...

**Neue Artikel für die Webseite** müssen als Markdown-Dateien in dem Unterordner `_posts` mit Datum und Titel in der Form `YYYY-MM-DD-Titel.md` erstellt werden. Der Beitrag benötigt einen Header, wie nachfolgend gezeigt. Diese Informationen werden dann von der Vorlage für Blogpost-Seiten genutzt, um die Seite zu generieren.

```markdown
---
layout: post
author: Adrian Singer
description: Mein supertolles Projekttreffen
categories: Meetings
tags: [Projekttreffen, Chemnitz]
image: /insert/image/url.jpg
---

Der Text beginnt hier...
```

Tabellen lassen sich leicht anlegen und werden dann automatisch formattiert.

Organisation | Ort
------------ | -------------
ALTRAN       | Hamburg
HSMW         | Mittweida
XENON        | Dresden
IWU          | Chemnitz und Dresden

Neben Formattierungen und Code-Auschnitten kann diese Seitenvorlage auch [Mermaid-Diagramme](https://github.com/knsv/mermaid) zur Erstellung von Graphen einsetzen:

<div class="mermaid">
graph RL
    A[presentation layer] --> B[infrastructure layer]
    A --> C[persistence layer]
    B --> D[application layer]
    C --> D
    D --> E[domain layer]
</div>

##### ...mit responsivem CSS Frontend

Das Frontend setzt auf [MaterializeCSS](https://materializecss.com/) auf und bietet ein umfangreiches Framework für responsive Webseiten, die dem [Material Design](https://material.io/design/) von Google entsprechen.
Für das Farbschema wurden einige CSS Klassen überschrieben, dies kann bei Bedarf in der Datei `assets/css/theme.css` weiter ausgebaut werden.

Die Seiten sind nach einem responsiven Grid Layout aufgebaut und können mittels HTML auch selbst gestaltet werden.

---

<h6>Columns</h6>
<div class="row">
    <div class="col grid-example s12 blue lighten-1"><span class="flow-text">s12</span></div>
    <div class="col grid-example s12 m4 l2 teal lighten-1"><span class="flow-text">s12 m4 l2</span></div>
    <div class="col grid-example s12 m4 l8 teal lighten-1"><span class="flow-text">s12 m4 l8</span></div>
    <div class="col grid-example s12 m4 l2 teal lighten-1"><span class="flow-text">s12 m4 l2</span></div>
    <div class="col grid-example s12 m6 l3 purple lighten-3"><span class="flow-text">s12 m6 l3</span></div>
    <div class="col grid-example s12 m6 l3 purple lighten-3"><span class="flow-text">s12 m6 l3</span></div>
    <div class="col grid-example s12 m6 l3 purple lighten-3"><span class="flow-text">s12 m6 l3</span></div>
    <div class="col grid-example s12 m6 l3 purple lighten-3"><span class="flow-text">s12 m6 l3</span></div>
</div>

<div class="divider"></div>

<h6>Offset</h6>
<div class="row">
    <div class="col s12 grid-example"><span class="flow-text">This div is 12-columns wide on all screen sizes</span></div>
    <div class="col s6 offset-s6 grid-example"><span class="flow-text">6-columns (offset-by-6)</span></div>
</div>

---

<h6>Buttons und Links</h6>
<div class="row">
    <div class="col s12">
        <a class="waves-effect waves-light btn">button</a>
        <a class="waves-effect waves-light btn"><i class="material-icons left">cloud</i>button</a>
        <a class="waves-effect waves-light btn"><i class="material-icons right">cloud</i>button</a>
        <a class="waves-effect waves-light btn btn-flat"><i class="material-icons right">cloud</i>flat button</a>
        <a href="#!">normal link</a>
    </div>
</div>

<h6>Floating</h6> 
<div class="row">
    <div class="col s12">
        <a class="btn-floating btn-large waves-effect waves-light"><i class="material-icons">add</i></a>
    </div>
</div>

<h6>Large</h6> 
<div class="row">
    <div class="col s12">
        <a class="waves-effect waves-light btn-large">Button</a>
        <a class="waves-effect waves-light btn-large"><i class="material-icons left">cloud</i>button</a>
        <a class="waves-effect waves-light btn-large"><i class="material-icons right">cloud</i>button</a>
    </div>
</div>

<h6>Disabled</h6> 
<div class="row">
    <div class="col s12">
        <a class="btn-large disabled">Button</a>
        <a class="btn disabled">Button</a>
        <a class="btn-flat disabled">Button</a>
        <a class="btn-floating disabled"><i class="material-icons">add</i></a>
    </div>
</div>

<h6>Piktogramme</h6>

Neben den im CSS Framework mitgelieferten Icons können auch die von [MaterialDesignIcons](https://materialdesignicons.com/) verwendet werden. Diese sind weitaus umfangreicher und ebenso leicht einzubinden. Dazu muss ein `i-Tag` wie folgt in den Text eingebunden werden.

Code:

```html
Die Sache hat einen Haken: <i class="mdi mdi-shield-check-outline"></i>
```

Ergebnis:
Die Sache hat einen Haken: <i class="mdi mdi-shield-check-outline"></i>

Eine vollständige Übersicht über alle Icons findet man [hier](https://cdn.materialdesignicons.com/3.8.95/).
