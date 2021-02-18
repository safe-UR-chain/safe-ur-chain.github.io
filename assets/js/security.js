(function ($) {

    // -- fields

    var body = document.body,
        html = document.documentElement;

    var height, width, margin;

    var i = 0,
        duration = 750,
        trunc = 30;

    var root, treemap, svg, tooltip;

    // -- start procedure

    $(document).ready(function () {
        $('.pushpin').pushpin({
            top: 575,
            bottom: $(document). height() - 500,
            offset: 75
          });

        $('.modal').modal();

        initSvg();
        buildTree("#treemap");

        setModal("#node-blockchain");

    });

    // -- functions

    function initSvg() {
        var h = $(window).height() - 100;
        // Set the dimensions and margins of the diagram
        margin = { top: 20, right: 90, bottom: 30, left: 90 },
            width = $(window).width() * 0.4,
            height = h - margin.top - margin.bottom;
    }

    function setModal(selector) {
        var $el = $(selector).clone();
        $('#av-content').empty().append($el);
    }

    function buildTree(selector) {

        tooltip = d3.select("body").append("div")
            .attr("class", "tooltip")
            .style("opacity", 0);

        // appends a 'group' element to 'svg'
        // moves the 'group' element to the top left margin
        svg = d3.select(selector).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", "translate("
                + margin.left + "," + margin.top + ")");

        treemap = d3.tree().size([height, width]);

        // Assigns parent, children, height, depth
        root = d3.hierarchy(getTree("Attacks"), function (d) { return d.children; });
        root.x0 = height / 2;
        root.y0 = 0;

        // Collapse after the second level
        root.children.forEach(collapse);

        update(root);
    }

    function collapse(d) {
        if (d.children) {
            d._children = d.children
            d._children.forEach(collapse)
            d.children = null
        }
    }

    function truncate(str, len) {
        if (str.length > len) return str.substring(0, len) + "...";
        else return str;
    }

    function update(source) {

        // Assigns the x and y position for the nodes
        var treeData = treemap(root);

        // Compute the new tree layout.
        var nodes = treeData.descendants(),
            links = treeData.descendants().slice(1);

        // Normalize for fixed-depth.
        nodes.forEach(function (d) { d.y = d.depth * 250 });

        // ****************** Nodes section ***************************

        // Update the nodes...
        var node = svg.selectAll('g.node')
            .data(nodes, function (d) { return d.id || (d.id = ++i); });

        // Enter any new modes at the parent's previous position.
        var g = node.enter().append('g')
            .attr('class', 'node')
            .attr("transform", function (d) {
                return "translate(" + source.y0 + "," + source.x0 + ")";
            })
            .on('click', click);

        // Add Circle for the nodes
        g.append('circle')
            .attr('class', 'node')
            .attr('r', 1e-6)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            });

        // Add labels for the nodes
        var text = g.append('text')
            .attr("dy", ".35em")
            .attr("x", function (d) {
                return d.children || d._children ? -13 : 13;
            })
            .attr("text-anchor", function (d) {
                return d.children || d._children ? "end" : "start";
            });

        text.append('a')
            .attr("xlink:href", function (d) { console.log(d); return d.data.url; })
            .attr("target", function (d) {
                if (d.data.url !== undefined) {
                    return d.data.url.startsWith("http") ? "_blank" : "_self";
                }
                else {
                    return "";
                }
            })
            .attr("class", function (d) {
                return (d.data.url !== undefined ? "tooltip hyperlink" : "no-hyperlink");
            })
            .text(function (d) { return truncate(d.data.name, trunc); })
            .on("click", function (d) {
                d3.event.stopPropagation();
                if (d.data.url !== undefined && d.data.url.startsWith("#")) {
                    openModal(d.data.url);
                }
            })

        text.on("mouseover", function (d) {
            if (d.data.name.length <= trunc) return;
            tooltip.transition()
                .duration(200)
                .style("opacity", .9);
            tooltip.html(d.data.name)
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
        })
        text.on("mouseout", function (d) {
            if (d.data.name.length <= trunc) return;
            tooltip.transition()
                .duration(500)
                .style("opacity", 0);
        });

        // UPDATE
        var nodeUpdate = g.merge(node);

        // Transition to the proper position for the node
        nodeUpdate.transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + d.y + "," + d.x + ")";
            });

        // Update the node attributes and style
        nodeUpdate.select('circle.node')
            .attr('r', 10)
            .style("fill", function (d) {
                return d._children ? "lightsteelblue" : "#fff";
            })
            .attr('cursor', 'pointer');


        // Remove any exiting nodes
        var nodeExit = node.exit().transition()
            .duration(duration)
            .attr("transform", function (d) {
                return "translate(" + source.y + "," + source.x + ")";
            })
            .remove();

        // On exit reduce the node circles size to 0
        nodeExit.select('circle')
            .attr('r', 1e-6);

        // On exit reduce the opacity of text labels
        nodeExit.select('text')
            .style('fill-opacity', 1e-6);

        // ****************** links section ***************************

        // Update the links...
        var link = svg.selectAll('path.link')
            .data(links, function (d) { return d.id; });

        // Enter any new links at the parent's previous position.
        var linkEnter = link.enter().insert('path', "g")
            .attr("class", "link")
            .attr('d', function (d) {
                var o = { x: source.x0, y: source.y0 }
                return diagonal(o, o)
            });

        // UPDATE
        var linkUpdate = linkEnter.merge(link);

        // Transition back to the parent element position
        linkUpdate.transition()
            .duration(duration)
            .attr('d', function (d) { return diagonal(d, d.parent) });

        // Remove any exiting links
        var linkExit = link.exit().transition()
            .duration(duration)
            .attr('d', function (d) {
                var o = { x: source.x, y: source.y }
                return diagonal(o, o)
            })
            .remove();

        // Store the old positions for transition.
        nodes.forEach(function (d) {
            d.x0 = d.x;
            d.y0 = d.y;
        });

        // Creates a curved (diagonal) path from parent to the child nodes
        function diagonal(s, d) {

            path = `M ${s.y} ${s.x}
          C ${(s.y + d.y) / 2} ${s.x},
            ${(s.y + d.y) / 2} ${d.x},
            ${d.y} ${d.x}`

            return path
        }

        // Toggle children on click.
        function click(d) {
            if (d.children) {
                d._children = d.children;
                d.children = null;
            } else {
                d.children = d._children;
                d._children = null;
            }
            update(d);
        }
    }

    function openModal(selector) {
        var $el = $(selector).clone(); 
        $('#av-content').empty().append($el);

        $('#av-modal').modal('open');
    }

    function getTree(rootName) {

        return {
            name: rootName,
            children: [
                {
                    name: "Blockchain",
                    children: [{
                        name: "Sybil Attack",
                        url: "#sybil-attack"
                    }, {
                        name: "51% Attack",
                        url: "#fifty-one-attack"
                    }, {
                        name: "Proof of Work based Attack",
                        url: "#proof-of-work-attack"
                    }, {
                        name: "Cryptojacking",
                        url: "#cryptojacking"
                    }, {
                        name: "Quantum Computing",
                        url: "#quantum-computing"
                    }, {
                        name: "Consensus Delay",
                        url: "#consensus-delay"
                    }, {
                        name: "Eclipse Attack",
                        url: "#eclipse-attack"
                    }, {
                        name: "Block Withholding",
                        url: "#block-withholding"
                    }, {
                        name: "Empty Blocks",
                        url: "#empty-blocks"
                    }, {
                        name: "Long Range Attack / Precomputing Attack",
                        url: "#long-range-attack"
                    }, {
                        name: "Byzantine Fault Tolerance (BFT) based Attack",
                        url: "#bft-attack"
                    }, {
                        name: "Blockchain Ingestion",
                        url: "#blockchain-ingestion"
                    }, {
                        name: "Blacklisting",
                        url: "#blacklisting"
                    }, {
                        name: "Vector76 Attack",
                        url: "#vector76-attack"
                    }, {
                        name: "Sour Milk Attack",
                        url: "#sour-milk-attack"
                    }, {
                        name: "Nothing at Stake",
                        url: "#nothing-at-stake"
                    }, {
                        name: "Finney Attack",
                        url: "#finney-attack"
                    }, {
                        name: "Miner Collusion",
                        url: "#miner-collusion"
                    }, {
                        name: "Stake Grinding",
                        url: "#stake-grinding"
                    }, {
                        name: "Stake Amplification",
                        url: "#stake-amp"
                    }, {
                        name: "Fake Stake Attack",
                        url: "#fake-stake-attack"
                    }, {
                        name: "Transaction Malleability Attack",
                        url: "#trans-ma-attack"
                    }, {
                        name: "Front Running",
                        url: "#front-running"
                    }, {
                        name: "Length Expansion Attack",
                        url: "#length-expansion-attack"
                    }]
                }, {
                    name: "Interfaces"
                }, {
                    name: "Business Application",
                    children: [{
                        name: "Phishing",
                        url: "#phishing"
                    }, {
                        name: "Steganography Attack",
                        url: "#stegano-attack"
                    }]
                }, {
                    name: "Governance Compliance",
                    children: [{
                        name: "Dumpster Diving",
                        url: "#dumpster"
                    }]
                }, {
                    name: "Hardware",
                    children: [{
                        name: "USB Drop",
                        url: "#usb-drop"
                    }, {
                        name: "Data Corruption Attack",
                        url: "#data-corruption"
                    }, {
                        name: "Data Insertion Attack",
                        url: "#data-insertion"
                    }]
                }, {
                    name: "Hosting",
                    children: [{
                        name: "DoS Attack",
                        url: "#dos-attack"
                    }]
                }, {
                    name: "Network",
                    children: [{
                        name: "DNS Hijacking",
                        url: "#dns-hijacking"
                    }, {
                        name: "BGP Hijacking",
                        url: "#bgp-hijacking"
                    }, {
                        name: "Eavesdropping Attack",
                        url: "#eavesdropping"
                    }]
                }, {
                    name: "Operation System",
                    children: [{
                        name: "Role-based Access Control Privilege Escalation",
                        url: "#privilege-excalation"
                    }, {
                        name: "Broken Object Level Authorization",
                        url: "#broken-object"
                    }, {
                        name: "Virtual Disk Exploit",
                        url: "#virtual-disk-exploit"
                    }, {
                        name: "Timestamp-based Attack",
                        url: "#timestamp-based-attack"
                    }, {
                        name: "Brute Force Attack",
                        url: "#brute-force-attack"
                    }]
                }, {
                    name: "User",
                    children: [{
                        name: "Tampering Attack",
                        url: "#tampering"
                    }]
                }, {
                    name: "Other",
                    children: [{
                        name: "Overflows/Underflows",
                        url: "#over-underflows"
                    }, {
                        name: "Accumulation Attack",
                        url: "#accumulation"
                    }, {
                        name: "Short Address Attack",
                        url: "#short-address"
                    }, {
                        name: "Bribery Attack",
                        url: "#bribery-attack"
                    }, {
                        name: "Reentrancy Attack",
                        url: "#reentrancy"
                    }, {
                        name: "Void Address Attack",
                        url: "#void-address-attack"
                    }]
                }
            ]
        };
    }



})(jQuery); // end of jQuery name space