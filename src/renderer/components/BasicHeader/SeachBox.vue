<template>
    <div>
        <a-popover
            trigger="focus"
            placement="bottomLeft"
            overlayClassName="search-wrapper"
            :overlayStyle="overlayStyle"
            v-model="searchVisible"
        >
            <a-input-search
                placeholder="搜索音乐、视频、歌词、电台..."
                v-model="keyword"
                class="header-search"
                @search="onSearch"
            />
        </a-popover>
    </div>
</template>

<script>
import { debounce } from '@/utils/dom'
export default {
  data() {
    let keyword = this.$route.query.keyword || "";
    return {
      searchVisible: false,
      keyword: keyword,
      suggests: null,
      searchMap: {
        albums: "专辑",
        artists: "歌手",
        songs: "单曲",
        playlists: "歌单",
        mvs: "MV",
        videos: "视频"
      },
      hots: []
    };
  },
  created() {
    this.$watch(
      "keyword",
      debounce(newQuery => {
        this.search(newQuery);
      }, 500)
    );
  },
  computed: {
    overlayStyle() {
      return this.keyword && this.suggests
        ? { width: "200px", top: "50px" }
        : { width: "440px", top: "50px" };
    }
  },
  methods: {
    onSearch(keyword, event) {
      if (!this.keyword) return;
      event.preventDefault();
      console.log("onSearch");
      this.$router.push({ path: "/search", query: { keyword } });
    }
  }
};
</script>

<style>
.ant-popover-arrow {
  border-top-color: #fafafa !important;
  border-left-color: #fafafa !important;
}
</style>


<style lang="less" scoped>
.header-search {
  /deep/ .ant-input {
    height: 24px;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.2);
    color: rgba(255, 255, 255, 0.6);
    border: none;
    box-shadow: none;
    font-size: 12px;
  }
  /deep/ .ant-input-search-icon {
    color: rgba(255, 255, 255, 0.6) !important;
  }
}
.space-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.search-result {
  dd {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    a {
      color: #333;
    }
  }
}
</style>
