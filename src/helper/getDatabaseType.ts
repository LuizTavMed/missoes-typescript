export const getDatabaseType = (database: string | undefined): "oracle" | "mysql" | "mariadb" | "postgres" | "cockroachdb" | "sqlite" | "mssql" | "sap" | "cordova" | "nativescript" | "react-native" | "sqljs" | "mongodb" | "aurora-mysql"=>{
    if (database == "oracle" || database == "mysql" || database == "mariadb" || database == "postgres" || database == "cockroachdb" || database == "sqlite" || database == "mssql" || database == "sap" || database == "cordova" || database == "nativescript" || database == "react-native" || database == "sqljs" || database == "mongodb" || database == "aurora-mysql"){
        return database
    }
    else{
        return "oracle"
    }
}