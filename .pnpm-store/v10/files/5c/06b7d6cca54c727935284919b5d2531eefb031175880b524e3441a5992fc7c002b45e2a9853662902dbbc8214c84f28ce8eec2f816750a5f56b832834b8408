(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.nodeConnectionTypes = exports.NodeConnectionTypes = exports.Node = exports.ChatNodeMessageType = exports.ICredentialsHelper = exports.ICredentials = void 0;
    class ICredentials {
        id;
        name;
        type;
        data;
        constructor(nodeCredentials, type, data) {
            this.id = nodeCredentials.id ?? undefined;
            this.name = nodeCredentials.name;
            this.type = type;
            this.data = data;
        }
    }
    exports.ICredentials = ICredentials;
    class ICredentialsHelper {
    }
    exports.ICredentialsHelper = ICredentialsHelper;
    const __brand = Symbol('resolvedFilePath');
    exports.ChatNodeMessageType = {
        WITH_BUTTONS: 'with-buttons',
    };
    /**
     * This class serves as the base for all nodes using the new context API
     * having this as a class enables us to identify these instances at runtime
     */
    class Node {
    }
    exports.Node = Node;
    exports.NodeConnectionTypes = {
        AiAgent: 'ai_agent',
        AiChain: 'ai_chain',
        AiDocument: 'ai_document',
        AiEmbedding: 'ai_embedding',
        AiLanguageModel: 'ai_languageModel',
        AiMemory: 'ai_memory',
        AiOutputParser: 'ai_outputParser',
        AiRetriever: 'ai_retriever',
        AiReranker: 'ai_reranker',
        AiTextSplitter: 'ai_textSplitter',
        AiTool: 'ai_tool',
        AiVectorStore: 'ai_vectorStore',
        Main: 'main',
    };
    exports.nodeConnectionTypes = Object.values(exports.NodeConnectionTypes);
});
//# sourceMappingURL=interfaces.js.map