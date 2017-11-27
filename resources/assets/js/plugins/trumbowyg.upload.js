(function ($) {
    'use strict'
    var defaultOptions = {
        fileFieldName: 'image', // input field name
        data: [] // Additional data for ajax [{name: 'key', value: 'value'}]
    }

    addXhrProgressEvent()

    $.extend(true, $.trumbowyg, {
        langs: {
            // jshint camelcase:false
            en: {
                upload: 'Upload',
                file: 'File',
                uploadError: 'Error'
            }
        },
        // jshint camelcase:true

        plugins: {
            upload: {
                init: function (trumbowyg) {
                    trumbowyg.o.plugins.upload = $.extend(true, {}, defaultOptions, trumbowyg.o.plugins.upload || {})
                    var btnDef = {
                        fn: function () {
                            trumbowyg.saveRange()

                            var file,
                                prefix = trumbowyg.o.prefix

                            var $modal = trumbowyg.openModalInsert(
                                // Title
                                trumbowyg.lang.upload,

                                // Fields
                                {
                                    file: {
                                        type: 'file',
                                        required: true,
                                        attributes: {
                                            accept: 'image/*'
                                        }
                                    },
                                    alt: {
                                        label: 'description',
                                        value: trumbowyg.getRangeText()
                                    }
                                },

                                // Callback
                                function (values) {
                                    var data = new FormData()
                                    data.append(trumbowyg.o.plugins.upload.fileFieldName, file)

                                    trumbowyg.o.plugins.upload.data.map(function (cur) {
                                        data.append(cur.name, cur.value)
                                    })

                                    $.map(values, function (curr, key) {
                                        if (key !== 'file') {
                                            data.append(key, curr)
                                        }
                                    })

                                    if ($('.' + prefix + 'progress', $modal).length === 0) {
                                        $('.' + prefix + 'modal-title', $modal)
                                            .after(
                                                $('<div/>', {
                                                    'class': prefix + 'progress'
                                                }).append(
                                                    $('<div/>', {
                                                        'class': prefix + 'progress-bar'
                                                    })
                                                )
                                            )
                                    }
                                    //! BROADCAST EVENT UPLOAD FILE!
                                    Bus.$emit('upload-file', {data: data, trumbowyg: trumbowyg, $modal: $modal, values: values})
                                }
                            )

                            $('input[type=file]').on('change', function (e) {
                                try {
                                    // If multiple files allowed, we just get the first.
                                    file = e.target.files[0]
                                } catch (err) {
                                    // In IE8, multiple files not allowed
                                    file = e.target.value
                                }
                            })
                        }
                    }

                    trumbowyg.addBtnDef('upload', btnDef)
                }
            }
        }
    })

    function addXhrProgressEvent () {
        if (!$.trumbowyg && !$.trumbowyg.addedXhrProgressEvent) { // Avoid adding progress event multiple times
            var originalXhr = $.ajaxSettings.xhr
            $.ajaxSetup({
                xhr: function () {
                    var req = originalXhr(),
                        that = this
                    if (req && typeof req.upload === 'object' && that.progressUpload !== undefined) {
                        req.upload.addEventListener('progress', function (e) {
                            that.progressUpload(e)
                        }, false)
                    }

                    return req
                }
            })
            $.trumbowyg.addedXhrProgressEvent = true
        }
    }
})(jQuery)
