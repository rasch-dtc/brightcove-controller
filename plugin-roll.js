videojs.plugin('pluginRoll', function (options) {
    var player = this,
        allTextTacks,
        attLength,
        tt,
        cuePointAra = [],
        allCuePointData,
        overlay = document.createElement('p')
        ;

    overlay.className = 'vjs-overlay';
    overlay.innerHTML = options.overlayText;

    player.el().appendChild(overlay);

    console.info('bcCtrl: wait for loadmetadata event..');
    player.one("loadedmetadata", function () {
        cuePointAra = player.mediainfo.cue_points;

        allTextTacks = player.textTracks();
        attLength = allTextTacks.length;

        for (var i = 0; i < attLength; i++) {
            if (allTextTacks[i].kind === 'metadata') {
                tt = allTextTacks[i];
                break;
            }
        }

        function cueChange(){
            var cues = tt.activeCues;
            if (cues && cues.length > 0){
                console.info('cue change detected, active now: ', cues);
            }
        }

        window.cueInterval = setInterval(cueChange, 1);

        console.info('bcCtrl, cuepoints? ', tt.cues.length);

        tt.oncuechange = function () {
            if (tt.activeCues[0] !== undefined) {
                allCuePointData = getSubArray(cuePointAra, 'time', tt.activeCues[0].startTime);

                console.info('cue point data:', allCuePointData);
                console.info('cue point metadata:', allCuePointData[0].metadata);

                // is it a cue-point about pre- mid- or post-roll?
                if (allCuePointData[0].name.indexOf('Roll') > -1) {
                    // so first, pause the current video tho show an ad
                    player.pause();

                    // the metadata should contain our add-url to pull the ad-video
                    var url = allCuePointData[0].metadata;
                    url = url.replace('{tmstp}', new Date().getTime());

                    console.info('call this url to pull an ad video!', url);
                }
            } else {
                console.warn('got undefined cue point!', tt);
            }
        }
    });

    function getSubArray(targetArray, objProperty, value) {
        var i, totalItems = targetArray.length,
            objFound = false,
            idxArr = [];
        for (i = 0; i < totalItems; i++) {
            if (targetArray[i][objProperty] === value) {
                objFound = true;
                idxArr.push(targetArray[i]);
            }
        }
        return idxArr;
    };
});