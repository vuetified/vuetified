<template>

<v-container fluid>
    <v-layout row wrap>
        <v-spacer></v-spacer>
            <v-btn color="blue" flat>
            <file-upload
                :post-action="postAction"
                :put-action="putAction"
                :extensions="extensions"
                :accept="accept"
                :multiple="multiple"
                :directory="directory"
                :size="size || 0"
                :thread="thread < 1 ? 1 : (thread > 5 ? 5 : thread)"
                :headers="headers"
                :data="data"
                :drop="drop"
                :drop-directory="dropDirectory"
                :add-index="addIndex"
                :name="name"
                v-model="files"
                @input-filter="inputFilter"
                @input-file="inputFile"
                ref="upload"
                style="cursor:pointer;margin:10px;"
                >
                Choose Files
                </file-upload>
        </v-btn>
        <v-btn flat icon color="amber lighten-2" @click.native="isOption = !isOption">
            <v-icon>fa-cog</v-icon>
        </v-btn>
    </v-layout>
    <v-layout row wrap v-if="!isOption">
        <v-data-table
                :headers="th"
                :items="files"
                :light="true"
                no-data-text="Click `Choose Files` Button To Upload Files."
                :rows-per-page-items="perPageData"
            >
            <template slot="items" scope="props">

                <td class="title text-xs-left primary--text">
                    <img v-if="props.item.thumb" :src="props.item.thumb" width="40" height="auto" />
                    <span v-else>No Image</span>
                </td>
                <td class="title text-xs-left primary--text">
                    <v-edit-dialog
                    large
                    lazy
                    >
                    <span class="primary--text">{{ props.item.name | truncate(20) }}</span>
                    <div slot="input" class="mt-3 text-xs-center title primary--text">Update Name</div>

                    <v-text-field
                    slot="input"
                    label="Edit"
                    v-model="props.item.name"
                    single-line
                    counter
                    autofocus
                    :rules="[maxInput]"
                    >
                    </v-text-field>

                    </v-edit-dialog>
                </td>
                <td class="title text-xs-left primary--text">{{ props.item.size | formatSize }}</td>
                <td class="title text-xs-left primary--text">
                    <v-progress-circular
                        :size="45"
                        :width="5"
                        :rotate="360"
                        :value="progress(props.item.progress)"
                        color="teal"
                        v-if="props.item.active || props.item.progress !== '0.00'"
                    >
                    <span class="caption">{{ progress(props.item.progress) }}</span>
                    </v-progress-circular>
                </td>
                <!-- status -->
                <td v-if="props.item.error" class="title text-xs-left primary--text">{{props.item.error}}</td>
                <td v-else-if="props.item.success" class="title text-xs-left primary--text">success</td>
                <td v-else-if="props.item.active" class="title text-xs-left primary--text">active</td>
                <td v-else class="title text-xs-left primary--text"></td>

                <td class="title text-xs-center primary--text">
                    <v-btn flat icon color="red darken-4" v-if="props.item.active" @click.native="props.item.active ? $refs.upload.update(props.item, {error: 'cancel'}) : false">
                    <v-icon>fa-times</v-icon>
                    </v-btn>
                    <v-btn flat icon color="info" v-else-if="props.item.error && props.item.error !== 'compressing' && $refs.upload.features.html5" @click.native="$refs.upload.update(props.item, {active: true, error: '', progress: '0.00'})">
                    <v-icon>fa-refresh</v-icon>
                    </v-btn>
                    <v-btn flat icon color="blue" v-else @click.native="props.item.success || props.item.error === 'compressing' ? false : $refs.upload.update(props.item, {active: true})">
                    <v-icon>fa-upload</v-icon>
                    </v-btn>
                    <v-btn flat icon color="red lighten-2" @click.native="remove(props.item)">
                    <v-icon>fa-trash</v-icon>
                    </v-btn>
                </td>
            </template>

            </v-data-table>

    </v-layout>
    <v-layout row wrap v-if="!isOption">
        <v-spacer></v-spacer>
        <v-btn color="teal lighten-2" v-show="files.length > 0" @click.native="$refs.upload.active = true">Start Upload <v-icon right>play_arrow</v-icon></v-btn>
        <v-btn color="error" v-show="$refs.upload && $refs.upload.active" @click.native="$refs.upload.active = false">Stop Upload <v-icon right>stop</v-icon></v-btn>
        <v-btn color="red lighten-2" v-if="$refs.upload && !$refs.upload.active && files.length > 0" @click.native="files = []">Remove All Files <v-icon right>fa-times</v-icon></v-btn>
        <v-spacer></v-spacer>
    </v-layout>
    <v-layout row wrap v-if="isOption">
        <v-flex xs12>
            <v-text-field
                append-icon="fa-file-code-o "
                label="Accept"
                v-model="accept"
                color="info"
                :light="true"
                hint="Allow upload mime type"
                persistent-hint
                v-validate="'required'"
                :error-messages="errors.collect('mime-type')"
                data-vv-name="mime-type"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="fa-cogs"
                label="Extensions"
                v-model="extensions"
                color="info"
                :light="true"
                hint="Allow upload file extension"
                persistent-hint
                v-validate="'required'"
                :error-messages="errors.collect('extension')"
                data-vv-name="extension"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="http"
                label="Put Url"
                v-model="putAction"
                color="info"
                :light="true"
                hint="Disabled if Empty, After the shutdown, use the POST method to upload"
                persistent-hint
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="http"
                label="Post Url"
                v-model="postAction"
                color="info"
                :light="true"
                hint="Default Post URL"
                persistent-hint
                v-validate="'required'"
                :error-messages="errors.collect('post-url')"
                data-vv-name="post-url"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="fa-cubes"
                label="Thread"
                v-model="thread"
                color="info"
                :light="true"
                hint="Also upload the number of files at the same time (number of threads)"
                persistent-hint
                v-validate="'required|numeric|min_value:1'"
                :error-messages="errors.collect('thread')"
                data-vv-name="thread"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="trending_up"
                label="Max size"
                v-model.number="size"
                color="info"
                :light="true"
                hint="Size Unit in byte"
                persistent-hint
                v-validate="'required'"
                :error-messages="errors.collect('max-size')"
                data-vv-name="max-size"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="trending_down"
                label="Min size"
                v-model.number="minSize"
                color="info"
                :light="true"
                hint="Size Unit in byte"
                persistent-hint
                v-validate="'required'"
                :error-messages="errors.collect('min-size')"
                data-vv-name="min-size"
            ></v-text-field>
        </v-flex>
        <v-flex xs12>
            <v-text-field
                append-icon="fa-compress"
                label="Automatically compress"
                v-model.number="autoCompress"
                color="info"
                :light="true"
                v-validate="'required'"
                :error-messages="errors.collect('auto-compress')"
                data-vv-name="auto-compress"
            ></v-text-field>
            <p class="grey--text caption" v-if="autoCompress > 0">More than {{autoCompress | formatSize}} files are automatically compressed</p>
            <p class="grey--text caption" v-else>Set up automatic compression</p>
        </v-flex>
        <v-flex xs12>
            <v-checkbox v-bind:label="`Drag and drop upload: ${drop.toString()}`" v-model="drop" light></v-checkbox>
        </v-flex>
        <v-flex xs12>
            <v-checkbox v-bind:label="`Not checked, filter the dragged folder: ${dropDirectory.toString()}`" v-model="dropDirectory" light></v-checkbox>
        </v-flex>
        <v-flex xs12>
            <v-checkbox v-bind:label="`Automatically activate upload: ${uploadAuto.toString()}`" v-model="uploadAuto" light></v-checkbox>
        </v-flex>
    </v-layout>
</v-container>

</template>

<script>
import ImageCompressor from '@xkeshi/image-compressor'
import FileUpload from 'vue-upload-component'
export default {
    props: ['fileKey', 'putUrl', 'postUrl', 'single'],
    components: {
        FileUpload
    },
    mounted () {
        this.postAction = this.postUrl ? this.postUrl : ' /uploads/post'
        this.putAction = this.putUrl ? this.putUrl : null
        this.headers['Authorization'] = `Bearer ${vm.$cookie.get('access_token')}`
        this.name = this.fileKey
        if (this.single) {
            this.multiple = false
        }
    },
    data () {
        return {
            th: [
                { text: 'Thumb', value: 'thumb', align: 'left', sortable: true },
                { text: 'Name', value: 'name', align: 'left', sortable: true },
                { text: 'Size', value: 'size', align: 'left', sortable: true },
                { text: 'Progress', value: 'progress', align: 'left', sortable: true },
                { text: 'Status', value: 'speed', align: 'left', sortable: true },
                { text: 'Actions', align: 'center', sortable: false }
            ],
            files: [],
            /* file config */
            accept: 'image/png,image/gif,image/jpeg,image/webp',
            extensions: 'gif,jpg,jpeg,png,webp',
            minSize: 1024,
            size: 1024 * 1024 * 10,
            multiple: true,
            directory: false,
            drop: true,
            dropDirectory: true,
            addIndex: false,
            thread: 3,
            name: 'file',
            postAction: '/uploads/post',
            putAction: '/uploads/put',
            headers: {
                'X-Csrf-Token': App.csrfToken,
                /* added access token */
                'Authorization': ''
            },
            data: {
                '_csrf_token': App.csrfToken
            },
            autoCompress: 1024 * 1024,
            uploadAuto: false,
            /* file option */
            isOption: false,
            /* file name validation */
            maxInput: (v) => v.length <= 30 || 'Input too long!',
            /* file per page */
            perPageData: [10, 25, 50, { text: 'All', value: -1 }]
        }
    },
    methods: {
        progress (props) {
            return Math.round(props)
        },
        remove (file) {
            this.$refs.upload.remove(file)
        },
        inputFilter (newFile, oldFile, prevent) {
            if (newFile && !oldFile) {
                // Before adding a file
                // 添加文件前

                // Filter system files or hide files
                // 过滤系统文件 和隐藏文件
                if (/(\/|^)(Thumbs\.db|desktop\.ini|\..+)$/.test(newFile.name)) {
                    return prevent()
                }

                // Filter php html js file
                // 过滤 php html js 文件
                if (/\.(php5?|html?|jsx?)$/i.test(newFile.name)) {
                    return prevent()
                }

                // Automatic compression
                // 自动压缩
                if (newFile.file && newFile.type.substr(0, 6) === 'image/' && this.autoCompress > 0 && this.autoCompress < newFile.size) {
                    newFile.error = 'compressing'
                    const imageCompressor = new ImageCompressor(null, {
                        convertSize: Infinity,
                        maxWidth: 512,
                        maxHeight: 512
                    })
                    imageCompressor.compress(newFile.file)
                        .then((file) => {
                            this.$refs.upload.update(newFile, { error: '', file, size: file.size, type: file.type })
                        })
                        .catch((err) => {
                            this.$refs.upload.update(newFile, { error: err.message || 'compress' })
                        })
                }
            }

            if (newFile && (!oldFile || newFile.file !== oldFile.file)) {
                // Create a blob field
                // 创建 blob 字段
                newFile.blob = ''
                let URL = window.URL || window.webkitURL
                if (URL && URL.createObjectURL) {
                    newFile.blob = URL.createObjectURL(newFile.file)
                }

                // Thumbnails
                // 缩略图
                newFile.thumb = ''
                if (newFile.blob && newFile.type.substr(0, 6) === 'image/') {
                    newFile.thumb = newFile.blob
                }
            }
        },

        // add, update, remove File Event
        inputFile (newFile, oldFile) {
            if (newFile && oldFile) {
                // update
                // console.log(newFile)

                if (newFile.active && !oldFile.active) {
                    // beforeSend

                    // min size
                    if (newFile.size >= 0 && this.minSize > 0 && newFile.size < this.minSize) {
                        this.$refs.upload.update(newFile, { error: 'size' })
                    }
                }

                if (newFile.progress !== oldFile.progress) {
                    // progress
                }

                if (newFile.error && !oldFile.error) {
                    // error
                }

                if (newFile.success && !oldFile.success) {
                    Bus.$emit('file-uploaded', newFile.response)
                    if (newFile.response.message) {
                        vm.$popup({ message: newFile.response.message, backgroundColor: '#4db6ac', delay: 5, color: '#fffffa' })
                    }
                }
            }

            if (!newFile && oldFile) {
                // remove
                if (oldFile.success && oldFile.response.id) {
                    // $.ajax({
                    //   type: 'DELETE',
                    //   url: '/upload/delete?id=' + oldFile.response.id,
                    // })
                }
            }

            // Automatically activate upload
            if (Boolean(newFile) !== Boolean(oldFile) || oldFile.error !== newFile.error) {
                if (this.uploadAuto && !this.$refs.upload.active) {
                    this.$refs.upload.active = true
                }
            }
        }
    },
    watch: {
        fileKey (newValue) {
            this.name = newValue
        },
        single (newValue) {
            if (newValue) {
                this.multiple = false
            } else {
                this.multiple = true
            }
        }
    }
}
</script>
