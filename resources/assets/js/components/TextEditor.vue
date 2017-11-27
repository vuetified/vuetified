<template>
  <trumbowyg :config="config.advanced" v-model="content" :id="id"></trumbowyg>
</template>

<script>

import trumbowyg from 'vue-trumbowyg'
import 'trumbowyg/dist/ui/trumbowyg.css'
import 'trumbowyg/dist/plugins/noembed/trumbowyg.noembed.min.js'
// import 'trumbowyg/dist/plugins/colors/trumbowyg.colors.min.js'
// import 'trumbowyg/dist/plugins/colors/ui/trumbowyg.colors.css'
// import 'trumbowyg/dist/plugins/base64/trumbowyg.base64.min.js'
// import '../plugins/trumbowyg.upload.js'

export default {
    //* html = content
    //* disabled = disabled
    //* trumbowyg = current instance of trumbowyg
    props: ['html', 'disabled', 'uploadLink', 'id'],
    components: {
        trumbowyg
    },
    data: () => ({
        content: '',
        trumbowyg: null,
        // ? Configuration : https://alex-d.github.io/Trumbowyg/documentation/#use-plugins
        config: {
            advanced: {
                disabled: false,
                autogrow: true,
                removeformatPasted: true,
                autogrowOnEnter: false,
                resetCss: true,
                //! Customized Visible Buttons
                btns: [
                    ['viewHTML'],
                    ['undo'],
                    ['redo'],
                    // ['foreColor'], ['backColor'],
                    ['fontstyle'],
                    ['formatting'],
                    ['alignments'],
                    ['scripts'],
                    ['lists'],
                    ['embeds'],
                    ['links'],
                    ['horizontalRule'],
                    ['removeformat'],
                    ['fullscreen']
                ],
                //! Customized Buttons Groups
                btnsDef: {
                    'fontstyle': {
                        title: 'Bold, Italic, Underline, and Strikethrough',
                        dropdown: ['strong', 'em', 'underline', 'strikethrough'],
                        ico: 'strong',
                        hasIcon: true
                    },
                    'scripts': {
                        title: 'Superscript and Subscript',
                        dropdown: ['superscript', 'subscript'],
                        ico: 'superscript',
                        hasIcon: true
                    },
                    'lists': {
                        title: 'Unordered List and Ordered List',
                        dropdown: ['unorderedList', 'orderedList'],
                        ico: 'unorderedList',
                        hasIcon: true
                    },
                    'links': {
                        title: 'Add Link and Remove Link',
                        dropdown: ['createLink', 'unlink'],
                        ico: 'createLink',
                        hasIcon: true
                    },
                    'alignments': {
                        title: 'Align Left, Center, Right , and Justify',
                        dropdown: ['justifyLeft', 'justifyCenter', 'justifyRight', 'justifyFull'],
                        ico: 'justifyCenter'
                    },
                    'embeds': {
                        title: 'Attach Image and Video',
                        //! removed base64 , 'upload'
                        dropdown: ['insertImage', 'noembed'],
                        ico: 'insertImage',
                        hasIcon: true
                    }
                }
            }
        } // End of Configs

    }),
    mounted () {
        let self = this
        //* Initialized Text Editor Component Data From Props
        self.config.advanced.disabled = self.disabled ? self.disabled : false
        //* Listen For Upload File Event
        // ? Desctructure payload --> $modal && values
        Bus.$on('upload-file', ({data, trumbowyg} = payload) => {
            self.trumbowyg = trumbowyg
            self.uploadImage(data)
        })
    },
    watch: {
        //* Whenever Parent Change Active Props Update Config
        // ? Useful For Disabling Text Editor
        'config.advanced.disabled' () {
            let self = this
            if (self.config.advanced.disabled === true) {
                $(`#${self.id}`).trumbowyg('disable')
            } else {
                $(`#${self.id}`).trumbowyg('enable')
            }
        },
        content (newValue) {
            let self = this
            Bus.$emit(`${self.id}-updated`, newValue)
        },
        html (newValue) {
            let self = this
            self.content = newValue
        }
    },
    methods: {
        uploadImage (form) {
            let self = this
            axios.post(self.uploadLink, form).then((response) => {
                self.trumbowyg.execCmd('insertImage', response.data.url)
                //* Attach Uploaded Image , Newly Created Link To Text Editor Component
                $('img[src="' + response.data.url + '"]:not([alt])', trumbowyg.$box).attr('alt', response.data.description)
                self.trumbowyg.closeModal()
                self.trumbowyg.$c.trigger('tbwuploadsuccess', [self.trumbowyg, form, response.data.url])
            }).catch(() => {
                self.$popup({ message: 'Oops! Sorry, Cant Upload Image.', backgroundColor: '#e57373', delay: 5, color: '#fffffa' })
            })
        }
    }
}
</script>

<style>

</style>
