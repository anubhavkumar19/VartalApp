const AuthImagePattern = ({ title, subtitle }) => {
    return (
        <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 mt-16"
            style={{ backgroundColor: "#f9b062" }}>
            <div className="max-w-md text-center">
                <div className="grid grid-cols-3 gap-3 mb-8">
                    {(() => {
                        const chars = "VartalApp".split("");
                        // Simple shuffle
                        for (let i = chars.length - 1; i > 0; i--) {
                            const j = Math.floor(Math.random() * (i + 1));
                            [chars[i], chars[j]] = [chars[j], chars[i]];
                        }
                        return chars.map((char, i) => (
                            <div
                                style={{
                                    backgroundColor: "#f8df83",
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    fontSize: "3rem",
                                    fontWeight: "bold"
                                }}
                                key={i}
                                className={`aspect-square rounded-2xl bg-primary/10 ${i % 2 === 0 ? "animate-pulse" : ""}`}
                            >
                                {char}
                            </div>
                        ));
                    })()}
                </div>


                <h2 className="text-2xl font-bold mb-4">{title}</h2>
                <p className="text-base-content/60">{subtitle}</p>
            </div>
        </div>
    );
};

export default AuthImagePattern;